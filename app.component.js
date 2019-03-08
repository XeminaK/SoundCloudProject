"use strict"

const play = {
    template: `
        <button ng-click="$ctrl.playIt()">test</button>
    `,
    controller: [function() {
        const vm = this

        SC.get('/tracks', {
            genres: 'rap', tag_list: 'drake'
          }).then(function(tracks) {
            console.log(tracks);
            vm.tracks = tracks
          });
        
        this.playIt = function(){
            SC.stream(`/tracks/${vm.tracks[0].id}`).then(function(player){
                player.play().then(function(){
                  console.log('Playback started!');
                }).catch(function(e){
                  console.error('Playback rejected. Try calling play() from a user interaction.', e);
                });
              });
        }
    }]
}

angular
    .module("app")
    .component("play", play)