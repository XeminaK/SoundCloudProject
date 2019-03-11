"use strict";

function NavigateService($location) {
    const self = this;
    self.toHome = function() {
        $location.path("/home");
    };
    self.toPlayer = function() {
        $location.path("/player");
    };
    self.toSettings = function() {
        $location.path("/settings");
    };
}

angular.module("App").service("NavigateService", NavigateService);