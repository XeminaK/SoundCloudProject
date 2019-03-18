"use strict";

const header = {
  templateUrl: "app/components/header/header.html",
  controller: ["NavigateService", "PlayerService", function(NavigateService, PlayerService) {
    const vm = this;

    vm.goToFavs = function() {
      NavigateService.toFavorites();
    }

    vm.goHome = function() {
      NavigateService.toHome();
    }

    vm.newPlaylist = function () {
      PlayerService.createMode = true;
      NavigateService.toSettings();
    }

  }]
}

angular.module("App").component("header", header);