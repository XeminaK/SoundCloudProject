"use strict";

function keys(PlayerService) {
  return {
    restrict: "A",
    link: function ($scope, $element, $attrs) {
      $element.bind('keydown', function (e) {
        if (e.keyCode == 32) {
          console.log("spacebar was pressed");
          console.log($scope);
          console.log($scope.$$listeners.play);
          PlayerService.togglePlay();
          e.preventDefault();
        }
      });
    }
  }
}


angular
  .module("App")
  .directive("keys", keys)