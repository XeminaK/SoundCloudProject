"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService", "PlayerService", "$rootScope", "ApiService", function (NavigateService, PlayerService, $rootScope, ApiService) {
    const vm = this;
    vm.startedMusic = false

    vm.$onInit = function () {
      vm.startedMusic = PlayerService.checkMusic();
      ApiService.getPlaylists().then(function (result) {
        PlayerService.setData(result.data);
      });
    };

    vm.startRadio = function () {
      PlayerService.startRadio();
      $rootScope.$broadcast('play', PlayerService.play);
      vm.startedMusic = true;
    }

  }]
}

angular.module("App").component("home", home);