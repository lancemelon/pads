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

  const updateTools = (index: number, newTool: IconKey) => {
    const updatedTools = tools.map((tool, i) => (i === index ? newTool : tool));
    setTools(updatedTools);
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="w-[100%] max-w-[calc(100vw-3rem)] h-[100%] rounded-lg border overflow-x-hidden"
    >
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} maxSize={80}>
            <WorkSpacePanel
              panelId={0}
              component={tools[0]}
              setComponent={updateTools}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="h-full">
            <div className="h-full overflow-y-auto">
              <WorkSpacePanel
                panelId={1}
                component={tools[1]}
                lesson={curLesson}
                setComponent={updateTools}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <WorkSpacePanel
          panelId={2}
          component={tools[2]}
          setComponent={updateTools}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default WorkSpace;
