angular.module('ProjectController', [])
  .controller('ProjectController', ['$http', 'ProjectService', '$scope', projectController]);

function projectController($http, ProjectService, $scope) {
  const self = this;
  self.projectArray = ProjectService.projectArray;
  self.publishedVersions = ProjectService.publishedProjectVersions;
  self.selectedVersion = ProjectService.selectedVersion;
  self.currentFile = ProjectService.currentFile;//function
  self.currentUrl = ProjectService.currentUrl; //function

  self.filesList = ProjectService.selectedVersionFilesList;//function
  self.fileVersions = ProjectService.fileChangedVersions; //function
  self.mediaContentUrl = ''
  self.showIframe = false;
  self.showEditor = false;
  self.showMedia = false;
  self.showFiles = false;
  self.toggleShowFiles = (index) => {
    self.showFiles = self.lastVersionIndex === undefined || index !== self.lastVersionIndex ? true : !self.showFiles;
    self.lastVersionIndex = index;
  }
  // self.showVersions = self.filesList().map(() => false);
  // self.toggleShowVersions = (index) => {

  //   self.showVersions[index] = !self.showVersions[index]
  // }
  self.getContent = function (url) {

    $http.get(url).then((res) => {
      self.content = res.data;
      self.showMedia = false;
      self.showEditor = true;
    });
  }
  self.preview = false;
  self.togglePreview = () => {
    self.preview = !self.preview;
  }
  self.getMediaContentUrl = () => self.mediaContentUrl;
  self.currentProject = ProjectService.currentProject;//function
  //clean this function up
  self.selectVersion = function (index) {
    self.showVersions = {};
    self.showEditor = false;
    self.showMedia = false;
    ProjectService.changeSelectedVersion(index);
    if (self.showIframe && self.lastProjectIndex !== null && index === self.lastProjectIndex) {
      self.showIframe = false;
    } else {
      self.showIframe = true;
    }
    self.lastProjectIndex = index;
  }

}
