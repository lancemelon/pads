interface OutputProps {
  codeOut: string; // Define codeOut as a string in the props
}

const Output = ({ codeOut }: OutputProps) => {
  return (
    <div className="w-full bg-gray-100 p-2 rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Program Output:
      </h3>
      <pre className="whitespace-pre-wrap bg-white p-3 rounded-md border border-gray-300 text-sm font-mono text-gray-800">
        {codeOut || "No output yet. Write some code and run it!"}
      </pre>
    </div>
  );
};

export default Output;
