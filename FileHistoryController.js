angular.module('FileHistoryController', [])
  .controller('FileHistoryController', ['ProjectService', '$scope', '$http', 'FileHistoryFactory', fileHistoryController]);
function fileHistoryController(ProjectService, $scope, $http, FileHistoryFactory) {
  //TODO: 
  $scope.projectobj = JSON.parse($scope.projectobject);
  console.log(typeof $scope.projectobject)
  $scope.versions = () => FileHistoryFactory.fileHistory($scope.filename);
  $scope.fileHistoryVersions = $scope.versions().sort((a, b) => {
    return (new Date(b.date) - new Date(a.date));
  });
  console.log($scope.fileHistoryVersions)
  $scope.logShit = () => console.log($scope.fileHistoryVersions);

  // $scope.fileHistory = 
  $scope.showInfo = false;
  $scope.showEditor = false;
  $scope.showMedia = false;
  $scope.previousEditorContent = '';

  $scope.toggleEditor = () => {
    $scope.showEditor = !$scope.showEditor;
  }
  $scope.toggleShowInfo = () => {
    console.log('clicked toggle show info')
    $scope.showInfo = !$scope.showInfo;

  }
  // $scope.historyObj = {
  //   project: $scope.projectname,
  //   changed: $scope.filename,
  // }
  $scope.makeNewHistoryObj = () => {
    console.log('historyObj data:')
    console.log($scope.editorContent)
    return {
      date: new Date(),
      data: $scope.editorContent,
      hash: '',
      publish: false,
      changed: $scope.filename,
      url: '',
      files: $scope.projectobj.files
    }
  }
  $scope.saveFile = function () {
    console.log('$scope.editorcontent in saveFile', $scope.editorContent);
    let newHistoryObj = $scope.makeNewHistoryObj();
    console.log('save clicked, historyoobj generated: \n', newHistoryObj);
    FileHistoryFactory.add(newHistoryObj);
    $scope.fileHistoryVersions.unshift(newHistoryObj);
    // console.log('after push, file history versions \n\n\n\n', $scope.fileHistoryVersions);

  }
  $scope.isText = true;
  $scope.file = '';
  //lots of ace editor options, look into themes

  $scope.aceOptions = {
    // useWrapMode: true,
    showGutter: true,
    onLoad: $scope.aceLoaded,
    onChange: $scope.aceChanged,
    enableSnippets: true,
    theme: 'monokai',
    mode: 'html',
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
  };
  $scope.aceEditor;
  $scope.aceLoaded = function (_editor) {
    // Options
    $scope.aceEditor = _editor;
    // _editor.setReadOnly(true);
    console.log("editor:", _editor);
  };



  $scope.aceChanged = function (e) {
    console.log('change event', e);
  };
  $scope.isImage = (file) => {
    let imageTester = /(\.jpeg$)|(\.jpg$)|(\.png$)|(\.gif$)|(\.json$)|(\.md$)|(\.log$)/i;
    return imageTester.test(file);
  }
  $scope.isText = (file) => {
    let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/i;
    return textTester.test(file);
  }
  $scope.updateEditorContent = function (index = 0, file) {
    console.log($scope.aceEditor);
    // console.log('update editor content index passed in: ', index)
    // console.log('item object:', file)
    // console.log('object in arr', $scope.fileHistoryVersions[index])
    let version = file ? file : $scope.fileHistoryVersions[index];

    // console.log(version);
    if (version && version.data) {
      // $scope.editorContent = version.data;
      $scope.editorContent = version.data;
      $scope.showEditor = true;
    } else {
      // $scope.showEditor = false;
      console.log('editorContetn: \n', $scope.editorContent)
      $http.get(version.url + $scope.filename).then((res) => {
        console.log('http called for ', version.url + $scope.filename)
        $scope.fileHistoryVersions[index].data = res.data;
        $scope.previousEditorContent = $scope.editorContent;
        $scope.versionSelected = index;
        $scope.editorContent = res.data;
        $scope.showEditor = true;
      });
    }
    // console.log($scope.editorContent);


  }
  $scope.clearEditor = function () {
    console.log('clear clicked', $scope.editorContent)
    $scope.previousEditorContent = $scope.editorContent;
    $scope.editorContent = '';
    console.log('after clear, content =  ', $scope.editorContent)
  }
  $scope.undo = function () {
    console.log('undo clicked');
    console.log($scope.previousEditorContent);
    $scope.editorContent = $scope.previousEditorContent;
  }
  function updateEditorMode() {
    let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/;
    // let text = textTester.test(file);
    // let type;
    // if (text) {
    //   type = textTester.exec(file)[0].slice(1);
    // }
  }

  // if (!url) {
  //   url = $scope.currentUrl() + $scope.filesList()[index];
  // }
  // let splitArr = url.split('/')
  // let file = splitArr[splitArr.length - 1];
  // let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/;
  // let text = textTester.test(file);
  // let type;
  // if (text) {
  //   type = textTester.exec(file)[0].slice(1);
  // }
  // if (!text) {
  //   $scope.getMediaContent(url);
  // } else {

  //   console.log(type);
  //   $scope.getContent(url);
  // }
  // }
  $scope.getMediaContent = (url) => {

    $scope.showEditor = false;
    $scope.mediaContentUrl = url;
    $scope.showMedia = true;
  }
  $scope.getContentUrl = ProjectService.getContentUrl; //function 
  // $http.get(self.getContentUrl(file)).then((res) => {
  //   $scope.editorContent = res.data;
  // })
  $scope.getAceMode = (ext) => {
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
  $scope.themes = [
    "chrome",
    "clouds",
    "crimson_editor",
    "dawn",
    "dreamweaver",
    "eclipse",
    "github",
    "solarized_light",
    "textmate",
    "tomorrow",
    "xcode",
    "kuroir",
    "katzenmilch",
    "ambiance",
    "chaos",
    "clouds_midnight",
    "cobalt",
    "idle_fingers",
    "kr_theme",
    "merbivore",
    "merbivore_soft",
    "mono_industrial",
    "monokai",
    "pastel_on_dark",
    "solarized_dark",
    "terminal",
    "tomorrow_night",
    "tomorrow_night_blue",
    "tomorrow_night_bright",
    "tomorrow_night_eighties",
    "twilight",
    "vibrant_ink"
  ];
  $scope.modes = [
    'abap',
    'actionscript',
    'ada',
    'apache_conf',
    'asciidoc',
    'assembly_x86',
    'autohotkey',
    'batchfile',
    'c9search',
    'c_cpp',
    'cirru',
    'clojure',
    'cobol',
    'coffee',
    'coldfusion',
    'csharp',
    'css',
    'curly',
    'd',
    'dart',
    'diff',
    'dockerfile',
    'dot',
    'dummy',
    'dummysyntax',
    'eiffel',
    'ejs',
    'elixir',
    'elm',
    'erlang',
    'forth',
    'ftl',
    'gcode',
    'gherkin',
    'gitignore',
    'glsl',
    'golang',
    'groovy',
    'haml',
    'handlebars',
    'haskell',
    'haxe',
    'html',
    'html_ruby',
    'ini',
    'io',
    'jack',
    'jade',
    'java',
    'javascript',
    'json',
    'jsoniq',
    'jsp',
    'jsx',
    'julia',
    'latex',
    'less',
    'liquid',
    'lisp',
    'livescript',
    'logiql',
    'lsl',
    'lua',
    'luapage',
    'lucene',
    'makefile',
    'markdown',
    'matlab',
    'mel',
    'mushcode',
    'mysql',
    'nix',
    'objectivec',
    'ocaml',
    'pascal',
    'perl',
    'pgsql',
    'php',
    'powershell',
    'praat',
    'prolog',
    'properties',
    'protobuf',
    'python',
    'r',
    'rdoc',
    'rhtml',
    'ruby',
    'rust',
    'sass',
    'scad',
    'scala',
    'scheme',
    'scss',
    'sh',
    'sjs',
    'smarty',
    'snippets',
    'soy_template',
    'space',
    'sql',
    'stylus',
    'svg',
    'tcl',
    'tex',
    'text',
    'textile',
    'toml',
    'twig',
    'typescript',
    'vala',
    'vbscript',
    'velocity',
    'verilog',
    'vhdl',
    'xml',
    'xquery',
    'yaml',
  ];
}





//taken from project ctrl
// needs lots of refactoring
// self.aceOptions = {
//   useWrapMode: true,
//   showGutter: true,
//   onLoad: self.aceLoaded,
//   onChange: self.aceChanged,
// enableBasicAutocompletion: true,
//   //   enableLiveAutocompletion: true  
//   enableSnippets: true
//   // advanced: {
//   //   enableSnippets: true,
//   //   enableBasicAutocompletion: true,
//   //   enableLiveAutocompletion: true
//   // }
// };
// self.aceLoaded = function (_editor) {
//   // Options
//   _editor.setReadOnly(true);
// };

// self.aceChanged = function (e) {
//   //
// };
//   self.isImage = (file) => {
//     let imageTester = /(\.jpeg$)|(\.jpg$)|(\.png$)|(\.gif$)|(\.json$)|(\.md$)|(\.log$)/i;
//     return imageTester.test(file);
//   }
//   self.isText = (file) => {
//     let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/i;
//     return textTester.test(file);
//   }
//   self.updateEditorContent = (index, url) => {
//     console.log(self.fileVersions(self.filesList()[index]))
//     if (!url) {
//       url = self.currentUrl() + self.filesList()[index];
//     }
//     let splitArr = url.split('/')
//     let file = splitArr[splitArr.length - 1];
//     let textTester = /(\.html$)|(\.js$)|(\.css$)|(\.txt$)|(\.json$)|(\.md$)|(\.log$)/;
//     let text = textTester.test(file);
//     let type;
//     if (text) {
//       type = textTester.exec(file)[0].slice(1);
//     }
//     if (!text) {
//       self.getMediaContent(url);
//     } else {

//       console.log(type);
//       self.getContent(url);
//     }
//   }
//   self.getMediaContent = (url) => {

//     self.showEditor = false;
//     self.mediaContentUrl = url;
//     self.showMedia = true;
//   }