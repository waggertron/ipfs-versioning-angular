let FileHistoryPartial =
  `
  <div>
<h1>hey</h1>
{{file}}
</div>

`;

angular.module('FileHistoryDirective', ['FileHistoryController'])

  .directive('fileHistory', function () {
    return {
      restrict: 'E',
      file: '=file',
      controller: 'FileHistoryController',
      conntrollerAs: 'fvCtrl',
      template: FileHistoryPartial,
      replace: true
    };
  })