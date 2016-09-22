"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var mock = require("./mock/articulos.json");
var mongoClient = require("mongodb").MongoClient;
var formidable = require('formidable');
var path = require('path');
var fs = require("fs");
var app = express();
var url = "mongodb://cfgarcia:password@ds035856.mlab.com:35856/articulos";
var db;
app.use(express.static(__dirname + "/public"));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/archivos', express.static(__dirname + '/uploads/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

function excepHandler(res,msg,detalle,code) {
  console.log("error: " + msg);
  res.status(code || 500).json({"error": detalle});
}

mongoClient.connect("mongodb://cfgarcia:password@ds035856.mlab.com:35856/articulos",function(err,database){
  if(err) {
    console.log(err);
    process.exit(1);
  }
  db = database;
  app.listen(3000,function(){
    console.log("el servidor esta corriendo en el puerto 3000");
  })
})

app.get('/articulos',function(req,res){
  db.collection("articulos").find({}).toArray(function(err,docs){
    res.status(200).json(docs);
  })
})

app.post('/articulos',function(req,res){

  if(!(req.body.nombre)) {
      excepHandler(res,"Input invalido","falta alguno de los datos requeridos",400)
  }
  db.collection("articulos").insertOne(req.body, function(err, doc) {
    if (err) {
      excepHandler(res,err.message,"error al guardar el articulo",400)
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });

})

app.post("/upload",function(req,res) {
  var form = new formidable.IncomingForm();
  var fileName;
 form.multiples = true;

 form.uploadDir = path.join(__dirname, '/uploads');

  form.on('file', function(field, file) {
    var timestamp = new Date().getTime()
    var temp = file.name.split(".");
    temp[0] = temp[0] + timestamp.toString();
    file.name = temp.join(".");
    fileName = file.name;
    console.log(file.name);
    fs.rename(file.path, path.join(form.uploadDir, file.name ));
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
    excepHandler(res,"Error al subir el archivo","Error");
  });

  form.on('end', function() {
    res.status(201).json({"respuesta" : fileName});
  });

  form.parse(req);
})
