import React from "react";

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
import {BASE_URL} from "./api_confuguration"

class RichTextEditorComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    id:"",
    editorState: EditorState.createEmpty(),
    };
    this.handleEditorChange = (editorState) => this.setState({ editorState });
    this.handleSaveData=this.handleSaveData.bind(this)
    this.handleUpdateData=this.handleUpdateData.bind(this);
  }

  handleSaveData(){
    const data = {
        code: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        id:this.state.id
      };
    
    axios.post(BASE_URL + "add", data);
  }

  handleUpdateData(){
    const data = {
        code: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        id:this.state.id
      };
    
    axios.put(BASE_URL + "update", data);
  }

  componentDidMount() {
    axios.get(BASE_URL+"get").then(response => {
        const rawData = response.data[6].code;
        const blocksFromHTML = htmlToDraft(rawData);
        const content = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
    
        this.setState({ 
            editorState:EditorState.createWithContent(content),
            id:response.data[6].id
        })
    })
 
  }

  render() {
    return (
      <>
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
              editorState={this.state.editorState}
              onEditorStateChange={this.handleEditorChange}
              editorClassName="editor-class"
            />
          </div>
          <div>
            <textarea
              disabled
              value={draftToHtml(
                convertToRaw(this.state.editorState.getCurrentContent())
              )}
            ></textarea>
          </div>
          <button onClick={this.handleSaveData}>ClickMe</button>
          <button onClick={this.handleUpdateData}>Update</button> 
          <div></div>
        </div>
      </>
    );
  }
}

export default RichTextEditorComponent;
