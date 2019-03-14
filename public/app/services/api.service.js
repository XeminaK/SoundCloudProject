"use strict";
function ApiService($http) {
    const self = this;
    self.tracks = [];
    self.count = 0;
    self.createMode = null;

    self.getPlaylists = function() {
        return $http({
            method: "GET",
            url: "/playlists"
        })
    }

    // Posting a playlist
    self.editPlaylist = function(playlist) {
        console.log(playlist);
        self.createMode = false;
        self.playlist = {
            id: playlist.id,
            name: playlist.name,
            category: playlist.category,
            tags: playlist.tags
        }
        self.checkTags(playlist.tags)
    }
    self.setPlaylist = function(playlist) {
        self.createMode = true;
        self.playlist = {
            id: playlist.id,
            name: playlist.name,
            category: playlist.category,
            tags: playlist.tags
        }
        self.checkTags(playlist.tags)
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
                if (self.createMode) {
                    self.postPlaylist(self.playlist);
                }
                else {
                    console.log("hi");
                    self.putPlaylist(self.playlist);
                }
            }
        });
    }

    self.postPlaylist = function(data) {
        $http({
            method: "POST",
            url: "/playlists",
            data: data
        })
    }
    self.putPlaylist = function(data) {
        $http({
            method: "PUT",
            url: `/playlists/${data.id}`,
            data: data
        })
    }
    
}

angular.module("App").service("ApiService", ApiService);