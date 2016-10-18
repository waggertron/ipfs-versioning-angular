angular.module('myApp', ['ui.ace'])
  .config(function ($sceProvider) {
    $sceProvider.enabled(false);
  })
  .service('ProjectService', ['$http', '$q', function ($http, $q) {
    this.projectArrayLength = () => this.projectArray.length - 1;
    this.selectedVersion = () => this.newestVersion;
    this.currentUrl = () => this.selectedVersion.url;
    this.currentFile = () => this.selectedVersion.changed;
    this.changeSelectedVersion = (index) => {
      //will need to change to account for unpublished projects
      this.selectedVersion = this.projectArray[this.projectArrayLength() - index];
      console.log('this.selctedversion: ', this.selectedVersion);
      this.currentUrl = this.selectedVersion.url;
      console.log('this.currenturl: ', this.currentUrl);
      this.currentFile = this.selectedVersion.changed;
      console.log('this.currentFile: ', this.currentFile);
    }
    this.getContentUrl = () => {
      return this.currentUrl.slice(0, this.currentUrl.length - 1) + this.currentFile;
    }
    this.data = testData
    this.publishedProject = 'Dispersion'
    this.projectArray = this.data[this.publishedProject];
    this.newestVersion = this.projectArray[this.projectArrayLength()];

    // this.editorContent = this.currentProjectVersion;

  }])
  .controller('ProjectController', ['$http', 'ProjectService', function ($http, ProjectService) {
    const self = this;
    self.projectArray = ProjectService.projectArray;
    self.selectedVersion = ProjectService.selectedVersion;
    self.currentFile = ProjectService.currentFile;
    self.currentUrl = ProjectService.currentUrl;
    self.getContentUrl = ProjectService.getContentUrl;
    self.showIframe = false;
    self.lastProjectIndex = null;
    self.content = 'hey its working! \n new line as well';
    self.getContent = function (url) {
      //mock for now
      console.log('get content fired');
      url = 'https://ipfs.io/ipfs/QmPdqizZHVSKbCGkv6rXaotXwdwRC5jHQLUNy2niEfNg1o/index.html'
      $http.get(url).then((res) => {
        self.content = res.data;
      });
    }
    self.showProjHist = function () {
      console.log(self.projectArray);
    }
    self.selectVersion = function (index) {
      console.log('inside select version', 'index', index, 'lastProjectIndex', self.lastProjectIndex);
      ProjectService.changeSelectedVersion(index);
      //temp, take out with file version history
      $http.get(self.getContentUrl()).then((res) => {
        self.content = res.data;
      })

      console.log('currentUrl: ', self.currentUrl());
      if (self.showIframe && self.lastProjectIndex !== null && index === self.lastProjectIndex) {
        self.showIframe = false;
      } else {
        self.showIframe = true;
      }
      self.lastProjectIndex = index;
    }
  }]);