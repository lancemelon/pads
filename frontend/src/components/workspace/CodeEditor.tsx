import { useRef } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import axios from "axios";

interface CodeEditorProps {
  setCodeOut: React.Dispatch<React.SetStateAction<string>>;
}

const CodeEditor = ({ setCodeOut }: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  async function runCode(code: string) {
    try {
      const out = await axios.post("http://localhost:8080/api/runCode", {
        code: code,
      });
      console.log("Piston output: ", out.data.output);
      setCodeOut(out.data.output);
    } catch (error) {
      console.error("Error making request:", error);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col bg-[#DCDCDC]">
      <button
        onClick={() => {
          runCode(editorRef.current?.getValue() || "");
        }}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Run
      </button>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="# Write your Python code here"
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
