import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function SQLBlock({ sql }: { sql: string }) {
  return (
    <div className="glass p-4">
      <SyntaxHighlighter language="sql" style={oneDark}>
        {sql}
      </SyntaxHighlighter>
    </div>
  );
}