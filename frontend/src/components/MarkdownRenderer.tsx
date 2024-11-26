import React from "react";
import { marked } from "marked";
import "../markdown.css";

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const htmlContent = marked(content);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
