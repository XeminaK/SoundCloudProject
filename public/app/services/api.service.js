"use strict";
function ApiService($http) {
    const self = this;
    self.tracks = [];

    self.getPlaylists = function() {
        return $http({
            method: "GET",
            url: "/playlists"
        })
    }
    self.postPlaylist = function(data) {
        return $http({
            method: "POST",
            url: "/playlists",
            data: data
        });
    }

    // self.getTracks = function () {
        
    // }

    self.checkKeywords = function (keywords) {
        for (let i = 0; i < keywords.length; i++) {
            self.setTracks(keywords[i])
        }
    }
    self.setTracks = function(keyword) {
        SC.get('/tracks', {
            q: `${keyword}`, limit: 25
        }).then(function (tracks) {
            self.tracks = self.tracks.concat(tracks)
        });
    }
    // vm.data = {
    //     name: playlist.name,
    //     category: playlist.category,
    //     tags: vm.tagsArray,
    //     data: vm.apiData
    // }
}

angular.module("App").service("ApiService", ApiService);