"use strict";

const settings = {
    templateUrl: "app/components/settings/settings.html",
    controller: ["NavigateService", function(NavigateService) {
        const vm = this;
        vm.goBack = function() {
            NavigateService.toPlayer();
        }
        
    }]

}

angular.module("App").component("settings", settings);