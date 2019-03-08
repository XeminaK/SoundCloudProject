"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService", function(NavigateService) {
    const vm = this;
    vm.currentTrack = 0;
   
    SC.get('/tracks', {
      tag_list: 'drake, migos'
    }).then(function (tracks) {
      console.log(tracks);
      vm.tracks = tracks;
    });

    vm.nextTrack = function() {
      vm.currentTrack++;
      SC.stream(`/tracks/${vm.tracks[vm.currentTrack].id}`).then(function (player) {
        vm.player = player
        player.play();
        vm.play = true;
        vm.player.on('finish', function(){
          vm.nextTrack()
        })
      });
    }

    vm.startRadio = function () {
        SC.stream(`/tracks/${vm.tracks[0].id}`).then(function (player) {
          vm.player = player;
          player.play();
          console.log(player.on())
          vm.player.on('finish', function(){
            vm.nextTrack()
          })
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
    vm.newPlaylist = function() {
      NavigateService.toSettings();
    }
  }]
}

angular.module("App").component("home", home);