import { Editor } from "@monaco-editor/react";

// const dark = "#141414";
// const light = "#DCDCDC";

const CodeEditor = () => {
  return (
    <div className="flex items-center justify-center flex-col bg-[#DCDCDC]">
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue="# python"
      />
    </div>
  );
};

export default CodeEditor;
