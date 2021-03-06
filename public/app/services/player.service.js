"use strict";

function PlayerService($timeout) {
    const self = this;

    self.currentTrack = 0;
    self.keyword = 'techno'
    self.startedMusic = false;
    self.newKeywords = ['taylor swift']
    self.tracks = []
    self.playlistIndex = 0;
    self.time = 0; // time elapsed
    self.mytimeout = null; // timer itself
    self.stopped = null; // boolean
    self.activeTimer = false; // checks if there is an active timer in service.
    self.createMode = null;

    self.setData = function (data) {
        self.tracks = data;
    }
    
    self.nextTrack = function () {
        self.clearInterval()
        self.currentTrack++;
        SC.stream(`/tracks/${self.tracks[self.playlistIndex].data.data[self.currentTrack].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.play = true;
            self.nextTimer();
        });
    }

    self.startRadio = function (playlistIndex) {
        self.clearInterval()
        self.activeTimer = true;
        self.playlistIndex = playlistIndex;
        self.currentTrack = 0;
        SC.stream(`/tracks/${self.tracks[self.playlistIndex].data.data[self.currentTrack].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.startedMusic = true;
        });
        self.play = true;
    }

    self.pausePlayer = function() {
        self.player.pause();
    }

    self.togglePlay = function () {
        if (self.play) {
            self.player.pause();
            self.play = false;
            self.pauseTimer();
            return self.play;
        } else {
            self.player.play();
            self.play = true;
            self.startTimer()
            return self.play;
        }
    }

    self.getPlayStatus = function () {
        return self.play;
    }

    self.setDefaultImage = function () {
        for (let j = 0; j < self.tracks.length; j++) {
            for (let i = 0; i < self.tracks[j].data.data.length; i++) {
                if (self.tracks[j].data.data[i].artwork_url === null) {
                    self.tracks[j].data.data[i].artwork_url = "app/images/cloudie_face.png"
                }
            }
        }
    }

    self.checkMusic = function () {
        return self.startedMusic;
    }

    self.startTimer = function () {
        self.time++;
        //logic
        if (self.time < self.tracks[self.playlistIndex].data.data[self.currentTrack].duration/1000 ) {
            self.stopped = false;
            self.activeTimer = true;
            self.mytimeout = $timeout(self.startTimer, 1000);
        } else {
            self.nextTrack();
        }
    }

    self.pauseTimer = function () {
        $timeout.cancel(self.mytimeout);
        self.stopped = true;
        self.activeTimer = false
    }

    self.nextTimer = function () {
        self.time = 0;
        $timeout.cancel(self.mytimeout);
        self.mytimeout = $timeout(self.startTimer, 1000);
    }
    self.clearInterval = function() {
        $timeout.cancel(self.mytimeout);
        self.time = 0;
    }
    self.getTime = function() {
        return self.time;
    }

    self.checkTimer = function() {
        return self.activeTimer;
    }

    self.checkMode = function() {
        return self.createMode;
    }
}

angular.module("App").service("PlayerService", PlayerService);