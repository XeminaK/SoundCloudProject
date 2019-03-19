"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService","PlayerService","$rootScope","ApiService", function(NavigateService, PlayerService, $rootScope, ApiService) {
    const vm = this;
    vm.startedMusic = false;
    vm.playlists = [];
    vm.display = [];

    vm.$onInit = function() {
      vm.startedMusic = PlayerService.checkMusic();
      ApiService.getPlaylists().then(function(result) {
        for (let i = 0; i < result.data.length; i++) {
          result.data[i].data.data = ApiService.shuffle(result.data[i].data.data);
          vm.playlists = result.data;
          PlayerService.tracks = vm.playlists;
          PlayerService.setDefaultImage();
        }
        PlayerService.setData(result.data);
        ApiService.getCategories().then(function(result) {
          vm.categories = result.data;
          vm.combine();
        })
      });
    };
  
    //combines the categories with the playlists
    vm.combine = function() { 
      vm.display = [];
      for (let j = 0; j < vm.categories.length; j++) {
        vm.display.push({category: vm.categories[j].name, playlists: []})
      }
      for (let i = 0; i < vm.playlists.length; i++){
        vm.playlists[i].playlistIndex = i;
        for(let k = 0; k < vm.display.length; k++){
          if(vm.playlists[i].category === vm.display[k].category){
            vm.display[k].playlists.push(vm.playlists[i]);
          }
        }
      }
      console.log(vm.display);
    }

    vm.startRadio = function(index) {
      PlayerService.clearInterval();
      PlayerService.startRadio(index);
      $rootScope.$broadcast("play", PlayerService.play);
      vm.startedMusic = true;
    };
  }]
};

angular.module("App").component("home", home);
