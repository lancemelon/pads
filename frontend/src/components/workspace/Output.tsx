interface OutputProps {
  codeOut: string; // Define codeOut as a string in the props
}

const Output = ({ codeOut }: OutputProps) => {
  return (
    <div>
      <p>{codeOut}</p>
    </div>
  );
};

export default Output;
