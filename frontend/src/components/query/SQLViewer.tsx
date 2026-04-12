import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";



export default function SQLViewer({ sql }: { sql: string }) {
  const copy = () => navigator.clipboard.writeText(sql);

  return (
    <div className="glass p-4 relative">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs"
        title="Copy to clipboard"
      >
        <Copy size={14} />
      </button>

      <SyntaxHighlighter language="sql" style={oneDark}>
        {sql}
      </SyntaxHighlighter>
    </div>
  );
}