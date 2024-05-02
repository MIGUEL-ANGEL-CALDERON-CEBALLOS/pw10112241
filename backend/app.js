//PS1="$ "
//cd /Users/ccdm04/Desktop/pw10112241/proyecto/backend
//npm install
//node --watch app.js 
//PA QUE ERA ESTO
//$ cd /Applications/XAMPP/xamppfiles/bin   
//$ ./mysql -h localhost -u root -p
//para manipular la BD los DOS COMANDOS ANTERIORES
//borrar carpeta de modulos rm -rf node_modules

//una api si devuelve algo
//POSTMAN


///http://localhost:3000/api/clientes
//http://localhost:3000/api/clientes/12 <-porque el 12

//command t para abrir una nueva pestana y no cerrar el servidor

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

//Seleccionamos un cliente en especifico
//en el navegador todos son un GET
app.get('/api/clientes/:id', (req,res)=>{
    conexion.query('SELECT * FROM clientes WHERE id=?', [req.params.id],(error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    }) //el signo de ? se llama PARAMETRO PENDIENTE
});

app.delete('/api/clientes/:id',(req,res) =>{
    let id = req.params.id;
    conexion.query('DELETE FROM clientes WHERE id=?',[id], (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

//form action="" method="post" ... req.body
//al hacer el SUBMIT se lleva lo del atributo name
//insertar un nuevo cliente
app.post('/api/clientes',(req,res)=>{
    let data = {
        id:req.body.id, 
        nombre:req.body.nombre,     //en postman para insertar es: BODY, RAW, JSON....SEND
        apellido:req.body.apellido,
        direccion:req.body.direcion,
        telefono:req.body.telefono,
        rfc:req.body.rfc,
        curp:req.body.curp,
        cp:req.body.cp
    }
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql,data,(error,resultado)=>{
        if(error){
            throw error;
        }else{
            res.send(resultado);
        }
    });
});

//Actualizar
app.put('/api/clientes/:id',(req,res)=>{
    let id = req.params.id;         //solo el primero es .params
    let nombre= req.body.nombre;
    let apellido= req.body.apellido;
    let direccion= req.body.direccion;
    let telefono= req.body.telefono;
    let rfc= req.body.rfc;
    let curp= req.body.curp;
    let cp= req.body.cp;
    let sql="UPDATE clientes SET nombre=?, apellido=?, dirreccion=?, telefono=?, rfc=?, curp=?, cp=? WHERE id=?";
    conexion.query(sql,[nombre, apellido, direccion, telefono, rfc, curp,cp,id],(error, resultado)=>{ //AL ULTIMO VA EL ID en el data
        if(error){
            throw error;
        }else{
            res.send(resultado);
        }
    });    
});

//Encender servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log("Servidor escuchando puerto "+puerto);
});