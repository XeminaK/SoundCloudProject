<<<<<<< HEAD
"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService", "PlayerService", "$rootScope", function (NavigateService, PlayerService, $rootScope) {
    const vm = this;
    vm.startedMusic = false

    vm.$onInit = function () {
      vm.startedMusic = PlayerService.checkMusic();
      PlayerService.checkKeywords()
    }

    vm.startRadio = function () {
      PlayerService.startRadio();
      $rootScope.$broadcast('play', PlayerService.play);
      $rootScope.$broadcast('finish', PlayerService.play);
      vm.startedMusic = true;
    }

  }]
}

=======
"use strict";

const home = {
  templateUrl: "app/components/home/home.html",
  controller: ["NavigateService", "PlayerService", "$rootScope", function (NavigateService, PlayerService, $rootScope) {
    const vm = this;
    vm.startedMusic = false

    vm.$onInit = function () {
      vm.startedMusic = PlayerService.checkMusic();
      PlayerService.checkKeywords()
    }

    vm.startRadio = function () {
      PlayerService.startRadio();
      $rootScope.$broadcast('play', PlayerService.play);
      vm.startedMusic = true;
    }

  }]
}

>>>>>>> 95715cec7f8e77bd3a4b7667c8b1dd6a9e7a9e0f
angular.module("App").component("home", home);