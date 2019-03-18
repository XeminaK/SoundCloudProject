"use strict";

const favorites = {
    templateUrl: "app/components/favorites/favorites.html",
    controller: ["NavigateService", "ApiService", "PlayerService", function (NavigateService, ApiSerivce, PlayerService) {
        const vm = this;
        vm.startedMusic = false;
        vm.$onInit = function () {
          vm.startedMusic = PlayerService.checkMusic();
          ApiSerivce.getFavs().then(function(result){
            vm.favorites = result.data;
            PlayerService.favorites = vm.favorites
          })
        };
        vm.play = function(index) {
          PlayerService.playFavorite(index)
          vm.startedMusic = true
        }
    }]
}

angular.module("App").component("favorites", favorites);