"use strict";

const header = {
  templateUrl: "app/components/header/header.html",
  controller: ["NavigateService", function(NavigateService) {
    const vm = this;

    vm.goHome = function() {
      NavigateService.toHome();
    }

    vm.newPlaylist = function () {
      NavigateService.toSettings();
    }
  }]
}

angular.module("App").component("header", header);