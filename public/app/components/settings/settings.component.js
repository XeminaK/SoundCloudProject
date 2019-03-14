"use strict";

const settings = {
  templateUrl: "app/components/settings/settings.html",
  controller: ["NavigateService", "ApiService", "PlayerService", function (NavigateService, ApiService, PlayerService) {
    const vm = this;
    vm.tagsArray = [];
    vm.playlistIndex = null;
    vm.playlist = {};
    vm.tracks = null;

    vm.$onInit = function () {
      if (!PlayerService.createMode) {
        vm.tracks = PlayerService.tracks;
        vm.playlistIndex = PlayerService.playlistIndex;
        vm.playlist.name = vm.tracks[vm.playlistIndex].name;
        vm.playlist.category = vm.tracks[vm.playlistIndex].category;
        vm.playlist.tags = vm.convertTagsToObject(vm.tracks[vm.playlistIndex].tags);
        vm.playlist.id = vm.tracks[vm.playlistIndex].id;
        console.log(vm.playlist.id);
      }
    }


    vm.goBack = function () {
      NavigateService.toPlayer();
    }

    vm.submit = function (playlist) {
      if (PlayerService.createMode) {
        vm.tagsArray = [];
        vm.convertTagsToText(playlist);
        playlist.tags = vm.tagsArray;
        ApiService.setPlaylist(playlist);
      } else {
        vm.tagsArray = [];
        vm.convertTagsToText(playlist);
        playlist.tags = vm.tagsArray;
        ApiService.editPlaylist(playlist);
      }
    }


    vm.convertTagsToText = function (playlist) {
      for (let i = 0; i < playlist.tags.length; i++) {
        vm.tagsArray.push(playlist.tags[i].text);
      }
    }

    vm.convertTagsToObject = function (tags) {
      for (let i = 0; i < tags.length; i++) {
        vm.tagsArray.push({ text: tags[i] });
      }
      return vm.tagsArray;
    }
  }]

}

angular.module("App").component("settings", settings);