"use strict";
function ApiService($http) {
    const self = this;
    self.tracks = [];
    self.count = 0;

    self.setPlaylist = function(playlist) {
        self.playlist = {
            name: playlist.name,
            category: playlist.category,
            tags: playlist.tags
        }
        self.checkTags(playlist.tags)
    }

    self.getPlaylists = function() {
        return $http({
            method: "GET",
            url: "/playlists"
        })
    }
    self.postPlaylist = function(data) {
        $http({
            method: "POST",
            url: "/playlists",
            data: data
        })
    }

    self.checkTags = function (tags) {
        for (let i = 0; i < tags.length; i++) {
            self.setTracks(tags[i])
        }
    }

    self.setTracks = function(keyword) {
        SC.get('/tracks', {
            q: `${keyword}`, limit: 5
        }).then(function (tracks) {
            self.tracks = self.tracks.concat(tracks)
            self.count++
            if (self.count === self.playlist.tags.length) {
                self.playlist.data = { data: self.tracks }
                console.log(self.playlist)
                self.postPlaylist(self.playlist)
            }
        });
    }

}

angular.module("App").service("ApiService", ApiService);