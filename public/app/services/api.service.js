"use strict";
function ApiService($http, $location) {
    const self = this;
    self.tracks = [];
    self.count = 0;
    self.createMode = null;

    self.getPlaylists = function () {
        return $http({
            method: "GET",
            url: "/playlists"
        })
    }

    // Posting a playlist
    self.editPlaylist = function (playlist) {
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

    self.setPlaylist = function (playlist) {
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
        self.tracks = [];
        self.count = 0;
        for (let i = 0; i < tags.length; i++) {
            self.setTracks(tags[i])
        }
    }

    self.setTracks = function (keyword) {
        SC.get('/tracks', {
            q: `${keyword}`, limit: 15
        }).then(function (tracks) {
            self.tracks = self.tracks.concat(tracks)
            console.log(self.tracks);
            self.count++
            if (self.count === self.playlist.tags.length) {
                self.tracks = self.convertToHighRes(self.tracks);
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

    self.convertToHighRes = function (tracks) {
        let img = null;
        let orig = null;
        let imgEnd = null;
        console.log("test");
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].artwork_url !== null) {
                orig = tracks[i].artwork_url;
                img = tracks[i].artwork_url.split("");

                imgEnd = img.slice(img.length - 13, img.length - 1).join(""); // check for t500

                if (imgEnd !== "t500x500.jpg"){
                    console.log(img.length);
                    img = img.slice(0, img.length - 10).join("");
                    img = img + "-t500x500.jpg";
                    console.log(img);
                    tracks[i].artwork_url = img;
                } else {
                    tracks[i].artwork_url = orig;
                    console.log(orig)
                    tracks[i].artwork_url
                }
            }
        }
        return tracks;
    }

    self.postPlaylist = function (data) {
        $http({
            method: "POST",
            url: "/playlists",
            data: data
        }).then(function() {
            $location.path("/home");
        })
    }
    self.putPlaylist = function (data) {
        $http({
            method: "PUT",
            url: `/playlists/${data.id}`,
            data: data
        }).then(function() {
            $location.path("/home");
        })
    }

    self.deletePlaylist = function(playlist) {
        $http({
            method: "DELETE",
            url: `/playlists/${playlist.id}`
        }).then(function() {
            $location.path("/home");
        })
    }

    self.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        console.log(array)
        return array;
    }

}

angular.module("App").service("ApiService", ApiService);