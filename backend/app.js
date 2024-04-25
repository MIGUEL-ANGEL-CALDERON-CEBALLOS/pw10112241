//node --watch app.js 
//npm install
//cd /Users/ccdm04/Desktop/pw10112241/proyecto/backend
//PA QUE ERA ESTO
//$ cd /Applications/XAMPP/xamppfiles/bin
//$ ./mysql -h localhost -u root -p
//PS1="$ "
//borrar carpeta de modulos rm -rf node_modules

let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors()); //para aceptar solicitudes de un servidor que no sea el nuestro

//conexion a mysql
let conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'pwdata',
    port: '3306'
});

//nos conectamos al mysql
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a la base de datos');
    }
});

//rutas de acceso
app.get("/", function(req,res){
    res.send("Ruta de inicios");
});
//Seleccionamos todos los clientes
app.get('/api/clientes', (req,res)=>{
    conexion.query('SELECT * FROM clientes',(error, filas)=>{
    if(error){
        throw error;
    }else{
        res.send(filas);
    }
    });
});
// json formatter  localhost:3000/api/clientes

//Encender servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});