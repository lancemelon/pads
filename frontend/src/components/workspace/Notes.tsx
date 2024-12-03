import MarkdownRenderer from "../MarkdownRenderer";
import "../../markdown.css";
import { useState, useEffect } from "react";

/* 
--------------------------TODO-------------------------------------
Instead of sending curLesson from grandparent just get the url from
the pyLessons file. Better for transition to database rather than 
local files for lesson content.
*/

interface Module {
  module_title: string;
  content: string;
}

interface Chapter {
  title: string;
  modules: Module[];
}

interface NotesProps {
  curLesson: number; // `curLesson` is passed from the grandparent
}

const Notes = ({ curLesson }: NotesProps) => {
  const [chapter, setChapter] = useState<Chapter | null>(null); // Holds dynamically loaded lesson data

  // Fetch the lesson data dynamically when curLesson changes
  useEffect(() => {
    const loadLesson = async () => {
      try {
        const lessonData = await import(
          `../../assets/pyContent/lesson${curLesson}.json`
        );
        setChapter(lessonData.default); // Ensure JSON's default export is used
      } catch (error) {
        console.error(`Error loading lesson${curLesson}.json`, error);
        setChapter(null); // Reset chapter if loading fails
      }
    };

    loadLesson();
  }, [curLesson]); // Dependency on `curLesson`, so it reloads when `curLesson` changes

  // Display loading state or error if chapter is not loaded
  if (!chapter) {
    return <div>Loading lesson {curLesson}...</div>;
  }

  return (
    <div className="chapter-container">
      <h1 className="markdown-content font-bold text-4xl text-center">
        {chapter.title}
      </h1>
      {chapter.modules.map((module, index) => (
        <div key={index} className="module-container">
          <h2 className="markdown-content font-semibold text-xl">
            {module.module_title}
          </h2>
          <MarkdownRenderer content={module.content} />
        </div>
      ))}
    </div>
  );
};

export default Notes;
