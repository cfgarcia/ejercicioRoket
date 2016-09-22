"use strict";
var articulosService = angular.module("articulosService",[])
.service("articulosServ",function($http,$q){
  this.getArticulos = function() {
    var defered = $q.defer();
    $http.get("/articulos").then(function(res){
      defered.resolve(res);
    },function(err){
      defered.reject(err);
    })
    return defered.promise;
  }
  this.setArticulo = function(articulo) {
    var defered = $q.defer();
    $http.post("/articulos",articulo).then(function(res){
      defered.resolve(res);
    },function(err){
      defered.reject(err);
    });
    return defered.promise;
  }
})
