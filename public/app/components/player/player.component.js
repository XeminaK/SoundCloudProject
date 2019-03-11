"use strict";

const player = {
  templateUrl: "app/components/player/player.html",
  controller: ["NavigateService", function(NavigateService) {
    const vm = this;
    vm.goBack = function() {
      NavigateService.toHome();
    }
    vm.settings = function() {
      NavigateService.toSettings();
    }
  }]
}

angular.module("App").component("player", player);