"use strict";

function keys(PlayerService, $rootScope) {
  return {
    restrict: "A",
    link: function ($scope, $element, $attrs) {
      $element.bind('keydown', function (e) {
        if (e.keyCode == 32) {
          console.log("spacebar was pressed");
          console.log($rootScope);
          $rootScope.$broadcast('togglePlay', PlayerService.play);
          e.preventDefault();
        }
      });
    }
  }
}


angular
  .module("App")
  .directive("keys", keys)