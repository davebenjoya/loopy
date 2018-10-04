import React, { Component } from 'react';
// import LoopLibrary from './looplibrary.js'
// import Sequencer from './sequencer.js'

import Copy from './copy'
// import ClassDemo from './why-did-you-update-master/demo/src/index'


class App extends Component {

  render() {
    var libraryStyle = {name: "librarydiv"}
    return (
      <div className="App">
         <Copy className={libraryStyle}/>
         <div id='demo'>
         {/* <ClassDemo /> */}
         </div>
      </div>
    );
  }
}

export default App;
