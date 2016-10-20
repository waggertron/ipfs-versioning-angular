angular.module('myApp', ['ui.ace', 'ProjectService', 'ProjectController'])
  .config(['$sceProvider', function ($sceProvider) {
    $sceProvider.enabled(false);
  }])