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
  self.aceOptions = {
    useWrapMode: true,
    showGutter: true,
    onLoad: self.aceLoaded,
    onChange: self.aceChanged,
    enableSnippets: true
    // advanced: {
    //   enableSnippets: true,
    //   enableBasicAutocompletion: true,
    //   enableLiveAutocompletion: true
    // }
  };
  self.aceLoaded = function (_editor) {
    // Options
    _editor.setReadOnly(true);
  };

  self.aceChanged = function (e) {
    //
  };
  self.getContent = function (url) {

    $http.get(url).then((res) => {
      self.content = res.data;
      self.showMedia = false;
      self.showEditor = true;
    });
  }
  self.getMediaContentUrl = () => self.mediaContentUrl;
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
  self.isImage = (file) => {
    let imageTester = /(\.jpeg$)|(\.jpg$)|(\.png$)|(\.gif$)|(\.json$)|(\.md$)|(\.log$)/i;
    return imageTester.test(file);
  }
  self.isText = (file) => {
    let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/i;
    return textTester.test(file);
  }
  self.updateEditorContent = (index, url) => {
    console.log(self.fileVersions(self.filesList()[index]))
    if (!url) {
      url = self.currentUrl() + self.filesList()[index];
    }
    let splitArr = url.split('/')
    let file = splitArr[splitArr.length - 1];
    let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/;
    let text = textTester.test(file);
    let type;
    if (text) {
      type = textTester.exec(file)[0].slice(1);
    }
    if (!text) {
      self.getMediaContent(url);
    } else {

      console.log(type);
      self.getContent(url);
    }
  }
  self.getMediaContent = (url) => {

    self.showEditor = false;
    self.mediaContentUrl = url;
    self.showMedia = true;
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
