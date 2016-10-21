angular.module('FileVersion', [])
  .directive('fileVersion', function () {
    return {
      restrict: 'E',
      file: '=file',
      controller: 'FileVersionController',
      conntrollerAs: 'fvCtrl',
      templateUrl: 'FileVersionPartial'
    }
  })