"use strict";
var articulosController = angular.module("articulosController",["articulosService","angularFileUpload"])
.controller("articulosCont",function($scope,articulosServ,Notification,exceptionServ,FileUploader,$location){

    var uploader = $scope.uploader = new FileUploader({
      url:"/upload"
    });

    articulosServ.getArticulos().then(function(res){
      $scope.articulos = res.data;
    }).catch(function(err){
      throw new exceptionServ("Error al consultar",err);
    });

    $scope.setItem = function(item) {
      $scope.detalles=item.detalles;
      $scope.url =item.url;
      $scope.menuItem = item;
    }

    uploader.onSuccessItem = function(fileItem, response, status, headers) {
      var articulo = {
        nombre : $scope.nombre,
        url : response.respuesta
      }


      articulosServ.setArticulo(articulo).then(function(res){
        Notification("Guardado correctamente");
        $location.path("/");
      }).catch(function(err){
        throw new exceptionServ("Error al guardar",err);
      })
    };

    uploader.onAfterAddingFile = function(item) {
      
      if(!item.file.type.startsWith('image') ) {
        item.remove();
        $('#fileInput').val(null)
      }
    }

    $scope.guardar = function () {
      if($scope.subir){
        $scope.uploader.queue[0].upload();
      } else {
        var articulo = {
          nombre : $scope.nombre,
          detalles : $scope.descripcion
        }
        articulosServ.setArticulo(articulo).then(function(res){
          Notification("Guardado correctamente");
          $location.path("/");
        }).catch(function(err){
          throw new exceptionServ("Error al guardar",err);
        })
      }


    }
})
