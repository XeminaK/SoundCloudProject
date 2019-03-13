"use strict";

const settings = {
    templateUrl: "app/components/settings/settings.html",
    controller: ["NavigateService", "ApiService", function(NavigateService, ApiService) {
        const vm = this;
        vm.tagsArray = [];

        vm.goBack = function() {
            NavigateService.toPlayer();
        }
        
        vm.submit = function(playlist) {
            vm.convertTags(playlist);
            playlist.tags = vm.tagsArray;
            ApiService.setPlaylist(playlist);
        }
        
        vm.convertTags = function(playlist) {
            for (let i = 0; i < playlist.tags.length; i++) {
                vm.tagsArray.push(playlist.tags[i].text);
            }
        }
    }]

}

angular.module("App").component("settings", settings);