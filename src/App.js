import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


const App=() =>{

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>
      <Editor toolbar={{options:['inline','fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history' ]}} editorState={editorState} onEditorStateChange={setEditorState}/>
      </div>
      <div>
      <textarea
      disabled
      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
      </div>
    </div>
  );
}

export default App;