"use strict";

const player = {
  templateUrl: "app/components/player/player.html",
  controller: [function () {
    const vm = this;
  }]
}

angular.module("App").component("player", player);