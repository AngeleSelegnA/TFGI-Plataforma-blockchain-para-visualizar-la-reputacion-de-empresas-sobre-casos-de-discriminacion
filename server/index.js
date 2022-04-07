"use strict"; //Nos aseguramos de que no se puedan usar variables sin declarar

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); //Se cargan las variables de entorno a process.env
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const genName = require("randomstring");
var session = require('express-session');
var User = require('./User.module.js');

//Servidor
const app = express();
const port = process.env.PORT; //Se esta ejecutando en local y en 3000 se ejecuta la web

//Se deshabilita la cabecera x-powered-by para evitar fingerprinting (que no se sepa que se esta utilizando express)
app.disable('x-powered-by');

app.listen(port, () => {   
  console.log("The server is running");
});

//Conexion con BBDD y formato de los datos
try {
mongoose.connect(`${process.env.MONGO_START}${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_STREAM}`,{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, ()=>{
  console.log("Successfully connected to DB");
})
}catch(e){
  console.error("Could not connect");
}

//Habilitar cross-site requests PERO solo desde nuestra pagina de react
//credentials a true --> Access Control Allow Credentials
app.use(cors({origin : `${process.env.REACT_PAGE}`, credentials: true}));

//Recibir las respuestas como un json y poder dividirlos en clave-valor
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Se establece el tiempo  en el que la sesion expira
const expiryDate = new Date(Date.now() + 60 * 60 * 1000)

//Se usa httpOnly para evitar ataques XSS. Se usaria secure cookies también (al ser en localhost no es necesario)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  httpOnly: true,
  saveUninitialized: true,
  expires: expiryDate
}));

app.use(passport.initialize());
app.use(passport.session());

//Definimos la estrategia
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.REDIRECT_URI,
  scope: ['r_liteprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  //Verificacion asincrona
  process.nextTick(function () {

    //vamos a comprobar si el usuario está en la bbdd, si no, se añade
    User.findOne({'l_id' : profile.id}, (err, doc) =>{
      if(err) return done(err, null);
      else if(!doc){
          let unique = false;
          let username;
          /*
            Generamos un nombre de usuario y comprobamos que no exista ya: Normalmente el bucle tendra una
            complejidad O(1) ya que es dificil que se repita un nombre de usuario de tal longitud.
          */
          while(!unique){
            username = genName.generate({length:15,charset: 'alphanumeric'});
            unique = User.findOne({'u_name': username}, (err, res) =>{
              if(err) return false;
              else if(!res) return true;
              else return false;
            });
          }
          //Guardamos el id y el usuario generado de forma aleatoria
          const new_user = new User({ l_id : profile.id , u_name : username});
          new_user.save(function(){});

          //Se realiza callback con el nuevo usuario creado
          return done(null,new_user);
      }
      else{
          //Si el usuario ya existe se devuelve el documento
          return done(null, doc);
      }
    });    
  });
}));

app.get('/auth/linkedin',
  passport.authenticate('linkedin'),
  function(req, res){
  // Esta funcion no se llama, linkedin se encarga de la autenticacion
});

app.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
   if (err || !user) {
    // Si el usuario cancela el permiso
    return res.redirect(`${process.env.REACT_PAGE}/user`);
   }
   req.login(user, (err) => { 
    if (err) { return next(err); }
    //Si el usuario da permiso 
    res.redirect(`${process.env.REACT_PAGE}`);
   });
  })(req, res, next)
 });

//Se va a guardar el id del usuario para la cookie
passport.serializeUser((user, done) => { return done(null, user.id); });
//Se saca de la base de datos el usuario y se puede acceder a ella mediante req.user
passport.deserializeUser((id, done) => { User.findById(id, (err, user) => {return done (null, user.u_name);
})});

//Envia al frontend el valor del usuario
app.get('/getuser' , (req, res) => { res.send(req.user); });

//Se cierra la sesion
app.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if(!err) res.redirect(`${process.env.REACT_PAGE}`);
    else console.log(err.message);
  });
});