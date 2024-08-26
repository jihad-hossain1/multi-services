"use  client";

import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";

const MoncEditor = ({setContent,setIsContentChanged}: any) => {
    const editorRef: any = useRef(null);

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor; 
    }

    function showValue() {
        console.log(editorRef.current.getValue())
    }
    return (
        <>
            <button onClick={showValue}>Show value</button>
            <Editor
                height='90vh'
                defaultLanguage='javascript'
                defaultValue='// some comment'
                onMount={handleEditorDidMount}
            />
        </>
    );
};

export default MoncEditor;
