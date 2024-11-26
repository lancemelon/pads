import React, { useState } from "react";
import { Button } from "./ui/button";

type IconKey = "ChatBot" | "CodeEditor" | "Notes" | "Output";

interface ButtonGroupProps {
  buttons: Record<IconKey, React.ReactNode>;
  cur: IconKey;
  setComponent: (index: number, newTool: IconKey) => void;
  panelId: number;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  cur,
  setComponent,
  panelId,
}) => {
  const [selectedButton, setSelectedButton] = useState<IconKey | null>(cur);

  const handleButtonClick = (key: IconKey) => {
    setSelectedButton(key);
    setComponent(panelId, key);
  };

  return (
    <div className="flex gap-2">
      {Object.entries(buttons).map(([key, icon]) => (
        <Button
          key={key}
          variant="outline"
          size="icon"
          onClick={() => handleButtonClick(key as IconKey)}
          className={`hover:bg-neutral-300 bg-none ${
            selectedButton === key ? "bg-neutral-300" : ""
          }`}
          aria-pressed={selectedButton === key}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
