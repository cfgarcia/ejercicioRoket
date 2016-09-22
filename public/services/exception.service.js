"use strict";
var exceptionService = angular.module("exceptionService",["ui-notification"])
.service("exceptionServ",function(Notification) {
  return function Exception(msg,detalle = null) {
    this.name = "Excepcion",
    this.msg = msg,
    this.detalle = detalle
    notificar();
    function notificar () {
      Notification.error(msg);
    }
    Exception.prototype.constructor = Exception;
  }
})
