"use strict";

const footerComponent = {
  templateUrl: "app/components/footer/footer.html",
  controller: ["PlayerService", "$rootScope", "$timeout", "ApiService", function(PlayerService, $rootScope, $timeout, ApiService) {
    const vm = this;
    vm.currentTrack = 0;
    vm.time = 0;  // the time elapsed
    vm.mytimeout = null; // timer itself
    vm.stopped = null; // boolean that turns timer on/off

    vm.$onInit = function() {
      vm.tracks = PlayerService.tracks; 
      vm.currentTrack = PlayerService.currentTrack;
      vm.play = PlayerService.getPlayStatus();
      vm.time = PlayerService.getTime();
      vm.playlistIndex = PlayerService.playlistIndex;
      if (PlayerService.checkTimer()) {
        vm.startTimer()
      } else if (PlayerService.checkTimer() === false) {
        vm.stopped = true
      }
    }

    vm.$onDestroy = function() {
      $timeout.cancel(vm.mytimeout);
    }

    vm.nextTrack = function () {
      vm.currentTrack++;
      vm.play = true;
      PlayerService.nextTrack();
      vm.nextTimer();
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

    $rootScope.$on("play", function(event, data) {
      vm.play = true;
      PlayerService.setDefaultImage();
      vm.tracks = PlayerService.tracks;
      vm.currentTrack = 0;
      vm.playlistIndex = PlayerService.playlistIndex
      vm.startTimer();
      PlayerService.startTimer()
    })

    vm.startTimer = function () {
        vm.time = PlayerService.getTime();
        //logic
        if (vm.time < vm.tracks[vm.playlistIndex].data.data[vm.currentTrack].duration/1000 ) {
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
        $timeout.cancel(vm.mytimeout);
        vm.mytimeout = $timeout(vm.startTimer, 1000);
    }
  }]
}

angular.module("App").component("footerComponent", footerComponent);