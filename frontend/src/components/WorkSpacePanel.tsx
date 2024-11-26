import React, { useEffect, useState } from "react";
import { Terminal, Code, Bot, Notebook } from "lucide-react";
import ButtonGroup from "./ButtonGroup";

// Define types for props that different components may expect
type IconKey = "ChatBot" | "CodeEditor" | "Notes" | "Output";

// Define the expected props for each component
type ComponentProps = {
  ChatBot: {}; // ChatBot props (if any)
  CodeEditor: {}; // CodeEditor props (if any)
  Notes: { curLesson: number }; // Notes expects curLesson prop
  Output: {}; // Output props (if any)
};

interface WSPProps {
  panelId: number;
  component: IconKey;
  setComponent: (index: number, newTool: IconKey) => void;
  lesson?: number;
}

const WorkSpacePanel = ({
  component,
  lesson,
  setComponent,
  panelId,
}: WSPProps) => {
  const [CurComp, setCurComp] = useState<React.FC<
    ComponentProps[typeof component]
  > | null>(null);

  const icons: { [key in IconKey]: JSX.Element } = {
    ChatBot: <Bot />,
    CodeEditor: <Code />,
    Notes: <Notebook />,
    Output: <Terminal />,
  };

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const module = await import(`./workspace/${component}.tsx`);
        setCurComp(() => module.default); // Ensure we store the default export
      } catch (error) {
        console.error(`Error loading component ${component}.tsx`, error);
        setCurComp(null); // Set null explicitly for error cases
      }
    };

    loadLesson();
  }, [component]);

  // Pass the props dynamically based on the component
  const renderComponent = () => {
    if (CurComp) {
      // Dynamically pass props based on the component type
      switch (component) {
        case "Notes":
          return <CurComp curLesson={lesson || 0} />;
        default:
          return <CurComp />;
      }
    }
    return <div>Loading...</div>; // Fallback UI
  };

  return (
    <div className="relative">
      <ButtonGroup
        buttons={icons}
        cur={component}
        setComponent={setComponent}
        panelId={panelId}
      />
      {renderComponent()}
    </div>
  );
};

export default WorkSpacePanel;
