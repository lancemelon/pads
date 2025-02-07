import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import MarkdownRenderer from "../MarkdownRenderer";
import "../../markdown.css";
import axios from "axios";

const ChatBot = () => {
  const [text, setText] = useState("How can I help?");
  const [user, setUser] = useState("");

  async function askQuestion(prompt: string) {
    try {
      const response = await axios.post("https://pads.onrender.com/api/ask", {
        prompt: prompt,
      });

      console.log("Answer from server:", response.data.answer);
      setText(response.data.answer);
      setUser("");
    } catch (error) {
      console.error("Error making request:", error);
      setText("Error occurred while fetching the answer.");
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion(user);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-center items-center h-full">
        <p>
          <MarkdownRenderer content={text} />
        </p>
      </div>
      <div className="flex flex-row items-center justify-end w-full gap-2 p-4 mt-auto">
        <Textarea
          placeholder="Type your message here."
          className="flex-1"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={handleEnter}
        />
        <Button
          className="flex-shrink-0"
          onClick={() => {
            askQuestion(user);
          }}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
