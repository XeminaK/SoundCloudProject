"use strict";

const player = {
  templateUrl: "app/components/player/player.html",
  controller: ["PlayerService", "NavigateService", "$rootScope", "$timeout", function (PlayerService, NavigateService, $rootScope, $timeout) {
    const vm = this;
    vm.play = null;
    vm.playlistIndex = 0;
    vm.currentTrack = 0;
    vm.time = 0;  // the time elapsed
    vm.mytimeout = null; // timer itself
    vm.stopped = null; // boolean that turns timer on/off

    vm.goBack = function () {
      NavigateService.toHome();
    }

    vm.settings = function () {
      PlayerService.createMode = false;
      NavigateService.toSettings();
    }

    vm.$onInit = function () {
      PlayerService.createMode = true;
      vm.tracks = PlayerService.tracks;
      console.log(vm.tracks)
      vm.currentTrack = PlayerService.currentTrack;
      console.log(vm.currentTrack)
      vm.play = PlayerService.getPlayStatus();
      vm.time = PlayerService.getTime();
      vm.playlistIndex = PlayerService.playlistIndex;
      console.log(vm.playlistIndex)
      if (PlayerService.checkTimer()) {
        vm.startTimer();
        console.log("timer exists")
      } else if (PlayerService.checkTimer() === false) {
        vm.stopped = true
      }
      PlayerService.setDefaultImage();
      vm.changeBackground() 
    }

    vm.changeBackground = function(){
      let background = document.getElementsByClassName("player_container")
      console.log(background)
      let element = angular.element(background)
      console.log(element)
      let track = vm.tracks[vm.playlistIndex].data.data[vm.currentTrack]
      console.log(track)
      if (track.colors) {
        track = track.colors
        let color0 = `rgb(${track[0][0]},${track[0][1]},${track[0][2]})`;
        let color1 = `rgb(${track[1][0]},${track[1][1]},${track[1][2]})`;
        let color2 = `rgb(${track[2][0]},${track[2][1]},${track[2][2]})`;
        let color3 = `rgb(${track[3][0]},${track[3][1]},${track[3][2]})`;
        let color4 = `rgb(${track[4][0]},${track[4][1]},${track[4][2]})`;
        let color5 = `rgb(${track[5][0]},${track[5][1]},${track[5][2]})`;
        let color6 = `rgb(${track[6][0]},${track[6][1]},${track[6][2]})`;

        element.css({
          "background": `linear-gradient(130deg, ${color0}, ${color1}, ${color2}, ${color3}, ${color4}, ${color5}, ${color6}`,
          "background-size": "1400% 1400%",
          "animation": "AnimationName 30s ease infinite",
        });
      } else {
        track = vm.tracks[vm.playlistIndex].data.data[vm.currentTrack]
        console.log("no colors")
      }
    }

    vm.togglePlay = function() {
      vm.play = PlayerService.togglePlay();
      if(vm.stopped) {
        vm.startTimer();
      } else {
        vm.pauseTimer();
      }
    }
    vm.nextTrack = function () {
      vm.currentTrack++
      vm.play = true;
      vm.nextTimer();
      vm.changeBackground();
      PlayerService.nextTrack();
    }
    vm.$onDestroy = function() {
      $timeout.cancel(vm.mytimeout);
    }

    vm.startTimer = function () {
      vm.time = PlayerService.getTime();
      //logic
      if (vm.time < vm.tracks[vm.playlistIndex].data.data[vm.currentTrack].duration / 1000) {
        vm.stopped = false;
        vm.mytimeout = $timeout(vm.startTimer, 1000);
      } else {
        vm.currentTrack++;
        vm.mytimeout = $timeout(vm.startTimer, 1000);
      }
    }

    vm.pauseTimer = function () {
      $timeout.cancel(vm.mytimeout);
      vm.stopped = true;
    }

    vm.nextTimer = function () {
      vm.time = 0;
      $timeout.cancel(vm.mytimeout);
      vm.mytimeout = $timeout(vm.startTimer, 1000);
    }
  }]
}

angular.module("App").component("player", player);