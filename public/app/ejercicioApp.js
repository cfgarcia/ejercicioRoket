"use strict";
var ejercicioApp = angular.module("ejercicioApp",["ngRoute","articulosController","ui-notification","exceptionService"])
.config(function($routeProvider){

  $routeProvider
  .when("/", {
        templateUrl: "views/articulos.html",
        controller: "articulosCont",
    })
    .when("/articulo",{
      templateUrl: "views/postArticulo.html",
      controller: "articulosCont"
    })
    .otherwise("/")
})
.config(function(NotificationProvider) {
  NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
  });
})
