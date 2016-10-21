angular.module('ProjectController', [])
  .controller('ProjectController', ['$http', 'ProjectService', '$scope', projectController]);

function projectController($http, ProjectService, $scope) {
  const self = this;
  self.projectArray = ProjectService.projectArray;
  self.publishedVersions = ProjectService.publishedProjectVersions;
  self.selectedVersion = ProjectService.selectedVersion;
  self.currentFile = ProjectService.currentFile;//function
  self.currentUrl = ProjectService.currentUrl; //function
  self.getContentUrl = ProjectService.getContentUrl; //function 
  self.filesList = ProjectService.selectedVersionFilesList;//function
  self.fileVersions = ProjectService.fileChangedVersions; //function
  self.mediaContentUrl = ''
  self.showIframe = false;
  self.showEditor = false;
  self.showMedia = false;
  self.showVersions = {};

  self.lastProjectIndex = null;
  self.content = 'hey its working! \n new line as well';

  self.getContent = function (url) {

    $http.get(url).then((res) => {
      self.content = res.data;
      self.showMedia = false;
      self.showEditor = true;
    });
  }
  self.getMediaContentUrl = () => self.mediaContentUrl;
  self.currentProject = ProjectService.currentProject;
  self.selectVersion = function (index, file) {
    self.showVersions = {};
    self.showEditor = false;
    self.showMedia = false;
    ProjectService.changeSelectedVersion(index);
    //temp, take out with file version history
    $http.get(self.getContentUrl(file)).then((res) => {
      self.content = res.data;
    })
    if (self.showIframe && self.lastProjectIndex !== null && index === self.lastProjectIndex) {
      self.showIframe = false;
    } else {
      self.showIframe = true;
    }
    self.lastProjectIndex = index;
  }
  self.toggleShowVersions = (index) => {
    if (!self.showVersions[index]) {
      self.showVersions[index] = true;
    } else {
      self.showVersions[index] = false;
    }
  }
  self.getAceMode = (ext) => {
    let type;
    switch (ext) {
      case 'js':
        type = 'javascript';
        break;
      case 'html':
        type = '';
        break;
      case 'css':
        type = '';
        break;
      case 'json':
        type = '';
        break;
      default:
        type = '';
    }
    return type;
  }
}
