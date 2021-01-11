import logo from "./logo.svg";
import "./App.css";

import React, { useState, useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
  stateFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import axios from "axios";

const App = () => {
  const USER_API_BASE_URL = "http://192.168.1.15:8383/rawcode/";

  // async function rawData(){
  //   const testdata = await fetch(USER_API_BASE_URL + "get")
  //   const data = await testdata.json();
  //   return Promise.resolve(data[0])
  // }

  useEffect(() => {
    const temp = htmlToDraft("hello")
    setBlocksFromHTML(temp)
    // fetch(USER_API_BASE_URL + "get")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setRawData(data[0].code.toString())
    //     console.log(typeof(data[0].code))
    //   });
  }, []);

  //console.log(typeof(axios.get(USER_API_BASE_URL + "get").then((response) => console.log(response.data[0].code))));
  const [blocksFromHTML, setBlocksFromHTML] = useState(
    htmlToDraft("")
  );

  const content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );
  let data = {
    code: draftToHtml(convertToRaw(editorState.getCurrentContent())),
  };

  const saveData = () => {
    axios.post(USER_API_BASE_URL + "add", data);
  };

  return (
    <div className="App">
      <div>
        <Editor
          toolbar={{
            options: [
              "inline",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
          }}
          editorState={editorState}
          onEditorStateChange={(editorState) => setEditorState(editorState)}
          editorClassName="editor-class"
        />
      </div>
      <div>
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
      </div>
      <button onClick={saveData}>ClickMe</button>
      <div></div>
    </div>
  );
};

export default App;
