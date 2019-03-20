"use strict";

const header = {
  templateUrl: "app/components/header/header.html",
  controller: ["NavigateService", "PlayerService", "$rootScope", function(NavigateService, PlayerService, $rootScope) {
    const vm = this;

    vm.goHome = function() {
        NavigateService.toHome();
    }

    vm.newPlaylist = function () {
      if(PlayerService.createMode === false){
        $rootScope.$broadcast("popup", PlayerService.popup);
      }
      else {
        PlayerService.createMode = true;
        NavigateService.toSettings();
      }
    }

  }]
}

angular.module("App").component("header", header);