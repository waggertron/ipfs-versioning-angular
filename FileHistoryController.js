angular.module('FileHistoryController', [])
  .controller('FileHistoryController', ['ProjectService', fileHistoryController]);
function fileHistoryController(ProjectService) {

}

//taken from project ctrl
// needs lots of refactoring
// self.aceOptions = {
//   useWrapMode: true,
//   showGutter: true,
//   onLoad: self.aceLoaded,
//   onChange: self.aceChanged,
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