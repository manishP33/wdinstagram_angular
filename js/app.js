"use strict";

(function(){
  angular.module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
.config([
  "$stateProvider",
  RouterFunction
])
.controller("InstagramIndexController", [
  "InstagramFactory",
  InstagramIndexControllerFunction
])
.controller("InstagramShowController", [
  "$stateParams",
  "InstagramFactory",
  InstagramShowControllerFunction
])
.controller("InstagramNewController", [
  "InstagramFactory",
  InstagramNewControllerFunction
])
.factory("InstagramFactory", [
  "$resource",
  InstagramFactoryFunction
]);


  function InstagramNewControllerFunction(InstagramFactory){
    this.instagram = new InstagramFactory();
    this.create = function(){
      this.instagram.$save()
    }
  }

  function InstagramFactoryFunction($resource){
    return $resource("http://localhost:3000/enteries/:id", {}, {

    });
  }

  function InstagramIndexControllerFunction(InstagramFactory){
this.instagrams = InstagramFactory.query();

  }
  function InstagramShowControllerFunction($stateParams, InstagramFactory){
    this.instagram = InstagramFactory.get({id: $stateParams.id})
  }

  function RouterFunction($stateProvider){
    $stateProvider
    .state("instagramIndex", {
      url: "/instagrams",
      templateUrl: "js/ng-views/index.html",
      controller: "InstagramIndexController",
      controllerAs: "vm"
    })
    .state("instagramNew", {
      url: "/instagram/new",
      templateUrl: "js/ng-views/new.html",
      controller: "InstagramNewController",
      controllerAs: "vm"
    })
    .state("instagramShow", {
      url: "/instagrams/:id",
      controller: "InstagramShowController",
      controllerAs: "vm",
      templateUrl: "js/ng-views/show.html"
    });
  }
})();
