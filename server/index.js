"use strict"; //Nos aseguramos de que no se puedan usar variables sin declarar

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config(); //Se cargan las variables de entorno a process.env
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const genName = require("randomstring");
var session = require('express-session');
var User = require('./User.module.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecification = require('./swaggerSpecification');

//Servidor
const app = express();
const port = process.env.PORT; //Se esta ejecutando en local y en 3000 se ejecuta la web

app.use(cookieParser());

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

//Se redirige a Linkedin, donde se hará la autenticación
/**
* @openapi
* /auth/linkedin:
*   get:
*     tags: 
*       - Login
*     security:
*      - ApiKeyAuth: []
*     summary: Redirigir a Linkedin.
*     description: Envía al usuario a la página de Linkedin para que allí se autentique.
*     responses: 
*       200:
*         description: Redirección realizada correctamente.
*/
app.get('/auth/linkedin', passport.authenticate('linkedin'));

//Se redirige de vuelta a la web y genera la sesión de login
/**
* @openapi
* /auth/linkedin/callback:
*   get:
*     tags: 
*       - Login
*     security:
*      - ApiKeyAuth: []
*     summary: Gestiona la redirección de vuelta a la aplicación web.
*     description: Gestiona la redirección de vuelta a la aplicación web y genera una sesión de login para el usuario.
*     responses: 
*       200:
*         description: Redirección y login realizados con éxito.
*/
app.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
   if (err || !user) {
    // Si el usuario cancela el permiso
    return res.redirect(`${process.env.REACT_PAGE}`);
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
/**
* @openapi
* components:
*   schemas:
*     User:
*       type: string
* 
* 
* @openapi
* /getuser:
*   get:
*     tags: 
*       - Login
*     security:
*      - ApiKeyAuth: []
*     summary: Obtiene el nombre de usuario.
*     description: Devuelve el nombre de usuario para enviarlo al front. 
*     responses: 
*       200:
*         description: Nombre de usuario recibido con éxito. 
*         content:
*           application/json:
*             schema:
*               type: string
*               example: ZcNJA69bAkceP31
*               items:
*                 $ref: '#/components/schemas/User'
*/
app.get('/getuser' , (req, res) => { 
  res.status(200).send(req.user); 
});

//Se cierra la sesion
/**
* @openapi
* /logout:
*   get:
*     tags: 
*       - Logout
*     security:
*      - ApiKeyAuth: []
*     summary: Cierra la sesión.
*     description: Cierra la sesión del usuario.
*     responses: 
*       200:
*         description: Se hace logout correctamente.
*/
app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function (err) {
      if(!err) res.status(200).redirect(`${process.env.REACT_PAGE}`);
      else { console.log(err.message); }
    });
});

//Desde este endpoint se puede acceder al documento de swagger que muestra los endpoints
/**
* @openapi
* /swagger:
*   get:
*     tags: 
*       - Documentación
*     summary: Sirve este documento.
*     description: Se usa para poder acceder a este swagger.
*     responses: 
*       200:
*         description: Swagger cargado con éxito.
*         content:
*           application/json:
*             schema:
*               type: string
*/
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
