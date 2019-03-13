"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService", "PlayerService", "$rootScope", "ApiService", function (NavigateService, PlayerService, $rootScope, ApiService) {
    const vm = this;
    vm.startedMusic = false;

    vm.$onInit = function () {
      vm.startedMusic = PlayerService.checkMusic();
      ApiService.getPlaylists().then(function (result) {
        PlayerService.setData(result.data);
      });
    };

    // todo: nested ng-repeat 

    // vm.display = 
    // [
    //   {
    //     category: "activities",
    //     playlists: [
    //       // playlists in activities
    //     ]
    //   },
    //   {
    //     ...
    //   }
    // ]

    // todo: pass playlist index

    vm.startRadio = function (index) {
      PlayerService.startRadio(index);
      $rootScope.$broadcast('play', PlayerService.play);
      vm.startedMusic = true;
    }

  }]
}

angular.module("App").component("home", home);