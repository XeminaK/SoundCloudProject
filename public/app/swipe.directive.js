"use strict";

function addclass() {
  return {
    restrict: "A",
    link: function ($scope, $element, $attrs) {
      console.log("ghfjchgfjcfggchghghjjhcgvhgjvf");
      $element.on("swipeleft", function () {
        $element.addClass("animationLeft");
      })
    }
  }
}


angular
  .module("App")
  .directive("addclass", addclass)