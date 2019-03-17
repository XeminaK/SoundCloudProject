"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService","PlayerService","$rootScope","ApiService", function(NavigateService, PlayerService, $rootScope, ApiService) {
    const vm = this;
    vm.startedMusic = false;
    vm.playlists = [];

    vm.$onInit = function() {
      vm.startedMusic = PlayerService.checkMusic();
      ApiService.getPlaylists().then(function(result) {
        for (let i = 0; i < result.data.length; i++) {
          result.data[i].data.data = ApiService.shuffle(
            result.data[i].data.data
          );
          vm.playlists = result.data;
          console.log("shuffled");
          PlayerService.tracks = vm.playlists;
          PlayerService.setDefaultImage();
        }
        PlayerService.setData(result.data);
        console.log(vm.playlists);
      });
      vm.getcolors();
    };

    // todo: nested ng-repeat

    // vm.display =
    // [
    //   {
    //     category: "activities",
    //     playlists: [
    //       // playlists in activities
    //     ]
    //   },
    //   {
    //     ...
    //   }
    // ]

    // todo: pass playlist index

    vm.startRadio = function(index) {
      PlayerService.clearInterval();
      PlayerService.startRadio(index);
      $rootScope.$broadcast("play", PlayerService.play);
      vm.startedMusic = true;
    };

    vm.base64 = function(url, callback) {
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

    vm.getcolors = function() {
      vm.base64("https://i1.sndcdn.com/artworks-000036981681-ewqqqv-t500x500.jpg", function(response) {
        var img = document.getElementById("test");
        img.setAttribute("src", response);
        img.onload = function() {
          var colorThief = new ColorThief();
          console.log("YOOOOO", colorThief.getPalette(img, 8));
        };
      });
    };
  }]
};

angular.module("App").component("home", home);
