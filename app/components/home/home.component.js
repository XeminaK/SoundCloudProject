"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["ProjectService", function (ProjectService) {
    const vm = this;

    SC.get('/tracks', {
      tag_list: 'drake, migos'
    }).then(function (tracks) {
      console.log(tracks);
      vm.tracks = tracks
    });

    vm.startRadio = function () {
        SC.stream(`/tracks/${vm.tracks[0].id}`).then(function (player) {
          vm.player = player
          player.play();
          console.log(vm.player);
        });
        vm.play = true
    }
    vm.togglePlay = function () {
      if (vm.play) {
        vm.player.pause();
        vm.play = false;
      } else {
        vm.player.play();
        vm.play = true;
      }
    }
    
  }]
}

angular.module("App").component("home", home);