import logo from './logo.svg';
import './App.css';

import React, { useState} from 'react';
import { EditorState,convertToRaw,convertFromHTML,ContentState,stateFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';


const App=() =>{

  const blocksFromHTML = htmlToDraft(
    '<p>Hey <span style="color: rgb(235,107,86);">thi</span>s<strong>editor</strong>r<span style="color: rgb(26,188,156);">ocks</span>&nbsp;</p>'
);

const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
);
  
  const [editorState, setEditorState] = useState(EditorState.createWithContent(content));
    
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
          Learn ReacteditorClassName="editor-class"
        </a>
      </header> */}
      <div>
      <Editor toolbar={{options:['inline','fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history' ]}} 
      editorState={editorState} 
      onEditorStateChange={editorState => setEditorState(editorState)}
      editorClassName="editor-class"/>
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
