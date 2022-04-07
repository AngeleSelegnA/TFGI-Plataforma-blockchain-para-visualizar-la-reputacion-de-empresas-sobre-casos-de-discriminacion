//Creamos una cartera de ethereum
const wallet = require('ethereumjs-wallet');
//Generamos las claves públicas y privadas
const addressData = wallet['default'].generate();
//Mostramos la clave privada y la direccion
console.log(`Private key = , ${addressData.getPrivateKeyString()}`);
console.log(`Address = , ${addressData.getAddressString()}`);
