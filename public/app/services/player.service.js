"use strict";

function PlayerService() {
    const self = this;
    self.currentTrack = 0;
    self.keyword = 'techno'
    self.startedMusic = false;
    self.newKeywords = ['techno', 'edm', 'taylor swift']
    // self.databaseKeywords = ['techno', 'dogblood', 'edm']
    self.tracks = []

    self.checkKeywords = function () {
        for (let i = 0; i < self.newKeywords.length; i++) {
            self.getTracks(self.newKeywords[i])
        } 
    }

    self.getTracks = function (keyword) {
        SC.get('/tracks', {
            q: `${keyword}`, limit: 25
        }).then(function (tracks) {
            self.tracks = self.tracks.concat(tracks)
        });
    }

    self.nextTrack = function () {
        self.currentTrack++;
        SC.stream(`/tracks/${self.tracks[self.currentTrack].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.play = true;
            self.player.on('finish', function () {
                self.nextTrack()
            })
        });
    }

    self.startRadio = function () {
        SC.stream(`/tracks/${self.tracks[0].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.startedMusic = true;
            console.log(self.tracks)
            self.player.on('finish', function () {
                self.nextTrack()
            })
        });
        self.play = true;
    }

    self.togglePlay = function () {
        if (self.play) {
            self.player.pause();
            self.play = false;
            return self.play;
        } else {
            self.player.play();
            self.play = true;
            return self.play;
        }
    }

    self.getPlayStatus = function () {
        return self.play;
    }

    self.setDefaultImage = function () {
        for (let i = 0; i < self.tracks.length; i++) {
            if (self.tracks[i].artwork_url === null) {
                self.tracks[i].artwork_url = "app/images/cloudie_face.png"
            }
        }
    }

    self.checkMusic = function () {
        return self.startedMusic;
    }
}

angular.module("App").service("PlayerService", PlayerService);