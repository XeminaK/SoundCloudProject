"use strict";
const footerComponent = {
  templateUrl: "app/components/footer/footer.html",
  controller: ["PlayerService", "$rootScope", function(PlayerService, $rootScope) {
    const vm = this;
    vm.currentTrack = PlayerService.currentTrack;

    vm.$onInit = function() {
      vm.tracks = PlayerService.tracks; 
      vm.currentTrack = PlayerService.currentTrack;
      vm.play = PlayerService.getPlayStatus();
    }

    vm.nextTrack = function () {
      vm.currentTrack++;
      vm.play = true;
      PlayerService.nextTrack();
    }
    
    vm.togglePlay = function() {
      vm.play = PlayerService.togglePlay();
    }

    $rootScope.$on("play", function(event, data) {
      vm.play = true;
      console.log("test");
      PlayerService.setDefaultImage();
      vm.tracks = PlayerService.tracks;
      vm.currentTrack;
    })

    $rootScope.$on("finish", function(event, data) {
      PlayerService.nextTrack();
    })

  }]
}

angular.module("App").component("footerComponent", footerComponent);