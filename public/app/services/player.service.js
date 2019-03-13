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

    self.setData = function (data) {
        self.tracks = data;
    }
    
    self.nextTrack = function () {
        self.currentTrack++;
        SC.stream(`/tracks/${self.tracks[self.playlistIndex].data.data[self.currentTrack].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.play = true;
            // self.player.on('finish', function () {
            //     self.nextTrack()
            // })
            self.nextTimer();
        });
    }

    self.startRadio = function (playlistIndex) {
        self.playlistIndex = playlistIndex
        SC.stream(`/tracks/${self.tracks[self.playlistIndex].data.data[self.currentTrack].id}`).then(function (player) {
            self.player = player;
            player.play();
            self.startedMusic = true;
            // self.player.on('finish', function () {
            //     self.nextTrack()
            // })
        });
        self.play = true;
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
        for (let i = 0; i < self.tracks[self.playlistIndex].data.data.length; i++) {
            if (self.tracks[self.playlistIndex].data.data[i].artwork_url === null) {
                self.tracks[self.playlistIndex].data.data[i].artwork_url = "app/images/cloudie_face.png"
            }
        }
    }

    self.checkMusic = function () {
        return self.startedMusic;
    }

    self.startTimer = function () {
        console.log("service started")
        self.time++;
        //logic
        if (self.time < self.tracks[self.playlistIndex].data.data[self.currentTrack].duration/1000 ) {
            console.log(self.time)
            self.stopped = false;
            self.activeTimer = true;
            self.mytimeout = $timeout(self.startTimer, 1000);
        } else {
            self.nextTrack();
        }
    }

    self.pauseTimer = function () {
        console.log("paused")
        $timeout.cancel(self.mytimeout);
        self.stopped = true;
        self.activeTimer = false
    }

    self.nextTimer = function () {
        self.time = 0;
        $timeout.cancel(self.mytimeout);
        self.mytimeout = $timeout(self.startTimer, 1000);
    }

    self.getTime = function() {
        return self.time;
    }

    self.checkTimer = function() {
        return self.activeTimer;
    }
}

angular.module("App").service("PlayerService", PlayerService);