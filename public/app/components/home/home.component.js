"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService","PlayerService","$rootScope","ApiService", function(NavigateService, PlayerService, $rootScope, ApiService) {
    const vm = this;
    vm.startedMusic = false;
    vm.playlists = [];

    vm.$onInit = function() {
      vm.startedMusic = PlayerService.checkMusic();
      ApiService.getPlaylists().then(function(result) {
        for (let i = 0; i < result.data.length; i++) {
          result.data[i].data.data = ApiService.shuffle(
            result.data[i].data.data
          );
          vm.playlists = result.data;
          console.log("shuffled");
          PlayerService.tracks = vm.playlists;
          PlayerService.setDefaultImage();
        }
        PlayerService.setData(result.data);
        console.log(vm.playlists);
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

    vm.startRadio = function(index) {
      PlayerService.clearInterval();
      PlayerService.startRadio(index);
      $rootScope.$broadcast("play", PlayerService.play);
      vm.startedMusic = true;
    };
  }]
};

angular.module("App").component("home", home);
