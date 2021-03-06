"use strict";

angular
  .module("App")
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        template: "<home></home>"
      })
      .when("/player", {
        template: "<player></player>"
      })
      .when("/settings", {
        template: "<settings></settings>"
      })
      .otherwise({ redirectTo: "/" });
  }]);