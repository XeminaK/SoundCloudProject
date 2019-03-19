"use strict";
function ApiService($http, $location) {
  const self = this;
  self.tracks = [];
  self.count = 0;
  self.createMode = null;
  self.colorCounter = 0;

  self.getPlaylists = function() {
    return $http({
      method: "GET",
      url: "/playlists"
    });
  };

  // Posting a playlist
  self.editPlaylist = function(playlist) {
    console.log(playlist);
    self.createMode = false;
    self.playlist = {
      id: playlist.id,
      name: playlist.name,
      category: playlist.category,
      tags: playlist.tags
    };
    self.checkTags(playlist.tags);
  };

  self.setPlaylist = function(playlist) {
    self.createMode = true;
    self.playlist = {
      id: playlist.id,
      name: playlist.name,
      category: playlist.category,
      tags: playlist.tags
    };
    self.checkTags(playlist.tags);
  };

  self.checkTags = function(tags) {
    self.tracks = [];
    self.count = 0;
    for (let i = 0; i < tags.length; i++) {
      self.setTracks(tags[i]);
    }
  };

  self.getCategories = function() {
    return $http({
      method: "GET",
      url: "/categories"
    });
  };

  self.postCategory = function(data) {
    $http({
      method: "POST",
      url: "/categories",
      data: data
    });
  };

  self.setTracks = function(keyword) {
    SC.get("/tracks", {
      q: `${keyword}`,
      limit: 15
    }).then(function(tracks) {
      self.tracks = self.tracks.concat(tracks);
      console.log(self.tracks);
      self.count++;
      if (self.count === self.playlist.tags.length) {
        self.tracks = self.convertToHighRes(self.tracks);
        self.playlist.data = { data: self.tracks };
        console.log(self.playlist);
        self.setColors(self.tracks);
      }
    });
  };

  self.convertToHighRes = function(tracks) {
    let img = null;
    let orig = null;
    let imgEnd = null;
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].artwork_url !== null) {
        orig = tracks[i].artwork_url;
        img = tracks[i].artwork_url.split("");

        imgEnd = img.slice(img.length - 13, img.length - 1).join(""); // check for t500

        if (imgEnd !== "t500x500.jpg") {
          console.log(img.length);
          img = img.slice(0, img.length - 10).join("");
          img = img + "-t500x500.jpg";
          console.log(img);
          tracks[i].artwork_url = img;
        } else {
          tracks[i].artwork_url = orig;
          console.log(orig);
          tracks[i].artwork_url;
        }
      }
    }
    return tracks;
  };

  self.postPlaylist = function(data) {
    $http({
      method: "POST",
      url: "/playlists",
      data: data
    }).then(function() {
      $location.path("/home");
    });
  };
  self.putPlaylist = function(data) {
    $http({
      method: "PUT",
      url: `/playlists/${data.id}`,
      data: data
    }).then(function() {
      $location.path("/home");
    });
  };

  self.deletePlaylist = function(playlist) {
    $http({
      method: "DELETE",
      url: `/playlists/${playlist.id}`
    }).then(function() {
      $location.path("/home");
    });
  };

  self.shuffle = function(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

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
    return array;
  };

  self.setColors = function(tracks) {
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].artwork_url !== null) {
        self.getcolors(tracks[i].artwork_url);
      } else {
        self.colorCounter++;
        if (self.colorCounter === tracks.length) {
          if (self.createMode) {
            self.colorCounter = 0;
            console.log(self.playlist);
            self.postPlaylist(self.playlist);
          } else {
            self.colorCounter = 0;
            self.putPlaylist(self.playlist);
          }
        }
      }
    }
  };

  self.getcolors = function(url) {
    // problem: if the last url is null it wont post
    if (url !== null) {
      self.base64(url, function(response) {
        var img = document.getElementById("test");
        img.setAttribute("src", response);
        self.colorCounter++;
        img.onload = function() {
          var colorThief = new ColorThief();
          self.playlist.data.data[self.colorCounter].colors = colorThief.getPalette(img, 8);
        };
        if (self.colorCounter === self.tracks.length) {
          if (self.createMode) {
            self.colorCounter = 0;
            self.postPlaylist(self.playlist);
          } else {
            self.colorCounter = 0;
            self.putPlaylist(self.playlist);
          }
        }
      });
    } else {
      self.colorCounter++;
      if (counter === self.tracks.length) {
        if (self.createMode) {
          self.colorCounter = 0;
          self.postPlaylist(self.playlist);
        } else {
          self.colorCounter = 0;
          self.putPlaylist(self.playlist);
        }
      }
    }
  };

  self.base64 = function(url, callback) {
    // xml http request
    var xhr = new XMLHttpRequest();
    // on load calls the filereader api
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    // sends get request to the url
    xhr.open("GET", url);
    // requests the response as a blob
    xhr.responseType = "blob";
    xhr.send();
  };
}

angular.module("App").service("ApiService", ApiService);
