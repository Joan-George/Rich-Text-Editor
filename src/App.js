import logo from "./logo.svg";
import "./App.css";

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

import RichTextEditorComponent from "./RichTextEditorComponent"

const App = () => {
  const USER_API_BASE_URL = "http://192.168.1.15:8383/rawcode/";

  // async function rawData(){
  //   const testdata = await fetch(USER_API_BASE_URL + "get")
  //   const data = await testdata.json();
  //   return Promise.resolve(data[0])
  // }


  return (
    <div className="App">
    <RichTextEditorComponent />
    </div>
  );
};

export default App;
