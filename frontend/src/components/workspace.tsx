import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkSpacePanel from "./WorkSpacePanel";
import { useState } from "react";

type IconKey = "ChatBot" | "CodeEditor" | "Notes" | "Output";

interface WorkSpaceProps {
  curLesson: number;
}

function WorkSpace({ curLesson }: WorkSpaceProps) {
  const [tools, setTools] = useState<IconKey[]>([
    "CodeEditor",
    "Notes",
    "Output",
  ]);

  const [codeOut, setCodeOut] = useState("");

  const updateTools = (index: number, newTool: IconKey) => {
    const updatedTools = tools.map((tool, i) => (i === index ? newTool : tool));
    setTools(updatedTools);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="w-full max-w-[calc(100vw-3rem)] h-full rounded-lg border border-gray-300 shadow-md overflow-x-hidden bg-white"
    >
      <ResizablePanel defaultSize={100} className="bg-white rounded-t-lg p-4">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel
            defaultSize={20}
            maxSize={80}
            className="h-full border-r border-gray-200 rounded-bl-lg p-2"
          >
            <div className="h-full overflow-y-auto">
              <WorkSpacePanel
                panelId={0}
                component={tools[0]}
                lesson={curLesson}
                setComponent={updateTools}
                setCodeOut={setCodeOut}
                codeOut={codeOut}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={80}
            className="h-full bg-white rounded-br-lg p-2"
          >
            <div className="h-full overflow-y-auto">
              <WorkSpacePanel
                panelId={1}
                component={tools[1]}
                lesson={curLesson}
                setComponent={updateTools}
                setCodeOut={setCodeOut}
                codeOut={codeOut}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default WorkSpace;
