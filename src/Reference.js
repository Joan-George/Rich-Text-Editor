const Reference = () => {
    const USER_API_BASE_URL = "http://192.168.1.15:8383/rawcode/";

  // async function rawData(){
  //   const testdata = await fetch(USER_API_BASE_URL + "get")
  //   const data = await testdata.json();
  //   return Promise.resolve(data[0])
  // }

  let temp=1;
  const [count ,setCount] =useState(0)
  let [rawData,setRawData] = useState("")
 
  let [blocksFromHTML,setBlocksFromHTML] = useState(rawData => htmlToDraft(rawData))

  let content = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  let [editorState, setEditorState] = useState(
    EditorState.createWithContent(content)
  );
  
  useEffect(() => {
    setRawData("hey")
  },[]);


  const saveData = () => {
    const data = {
        code: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      };
    
    axios.post(USER_API_BASE_URL + "add", data);
  };

  return (
    <div className="App">
      {count}
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
}