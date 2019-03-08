"use strict";

const player = {
  templateUrl: "app/components/player/player.html",
  controller: ["ProjectService", function (ProjectService) {
    const vm = this;

    SC.get('/tracks', {
      tag_list: 'drake, migos'
    }).then(function (tracks) {
      console.log(tracks);
      vm.tracks = tracks
    });

    this.playIt = function () {
      SC.stream(`/tracks/${vm.tracks[0].id}`).then(function (player) {
        player.play().then(function () {
          console.log('Playback started!');
        }).catch(function (e) {
          console.error('Playback rejected. Try calling play() from a user interaction.', e);
        });
      });
    }

  }]
}

angular.module("App").component("player", player);