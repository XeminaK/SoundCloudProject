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
      vm.tracks = PlayerService.tracks;
      vm.currentTrack = PlayerService.currentTrack;
      vm.play = PlayerService.getPlayStatus();
      vm.time = PlayerService.getTime();
      vm.playlistIndex = PlayerService.playlistIndex;
      if (PlayerService.checkTimer()) {
        vm.startTimer();
        console.log("timer exists")
      } else if (PlayerService.checkTimer() === false) {
        vm.stopped = true
      }
      PlayerService.setDefaultImage();
    }
    vm.togglePlay = function() {
      vm.play = PlayerService.togglePlay();
      if(vm.stopped) {
        console.log("play");
        vm.startTimer();
      } else {
        console.log("pause");
        vm.pauseTimer();
      }
    }
    vm.nextTrack = function () {
      vm.currentTrack++;
      vm.play = true;
      vm.nextTimer();
      PlayerService.nextTrack();
    }
    vm.$onDestroy = function() {
      $timeout.cancel(vm.mytimeout);
      console.log("stopped timer on destroy in player")
    }

    vm.startTimer = function () {
      vm.time = PlayerService.getTime();
      //logic
      if (vm.time < vm.tracks[vm.playlistIndex].data.data[vm.currentTrack].duration / 1000) {
        console.log(vm.time)
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
      console.log("stopped timer in player, next track")
      $timeout.cancel(vm.mytimeout);
      vm.mytimeout = $timeout(vm.startTimer, 1000);
    }
  }]
}

angular.module("App").component("player", player);