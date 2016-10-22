// <li class="fileVersionListItem" ng-repeat="fileVersion in versions() track by $index">
let FileHistoryPartial =
  `
<div>
  <button class="fileButton" ng-click="updateEditorContent(); toggleShowInfo(); logShit()">{{filename.slice(1)}}</button>
  <div class="filediv" ng-show="showInfo">
    <ul class="fileVersionList">
      <li>Previous Versions</li>
      <button><</button>

      <li class="fileVersionListItem" ng-repeat="item in fileHistoryVersions track by $index">
        <a href="#" class="fileVersion" ng-click="updateEditorContent($index)">{{item.date | date:"MM/dd/yy h:mma"}}</a>
      </li>
      <button>></button>
    </ul>
    <button ng-click="saveFile()">Save</button>
    <button ng-click="clearEditor()">Clear</button>
    <button ng-click="undo()">Undo</button>
    <select ng-options="theme as theme for theme in themes" ng-model="aceOptions.theme"></select>
    <select ng-options="mode as mode for mode in modes" ng-model="aceOptions.mode"></select>
    <div class="editor" ng-if="showEditor && isText" ng-model="editorContent" ui-ace="aceOptions"></div>
    <button>Save</button>
    <button>Delete</button>
    <p>{{editorContent}}
    <div id="outer" ng-show="isImage(filename)">
      <img ng-if="isImage(filename)" ng-src='{{getMediaContentUrl(filename)}}' />
    </div>
  </div>
</div>
`;

angular.module('FileHistoryDirective', ['FileHistoryController'])

  .directive('fileHistory', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        index: '@',
        filename: '@',
        projectname: '@',
        projectobject: '@'
      },
      controller: 'FileHistoryController',
      template: FileHistoryPartial,
      replace: true
    };
  })