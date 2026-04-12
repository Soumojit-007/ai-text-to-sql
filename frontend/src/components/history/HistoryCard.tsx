import { Copy } from "lucide-react";
import { toastSuccess } from "../common/Toast";

export default function HistoryCard({ item }: any) {
  const copySQL = () => {
    navigator.clipboard.writeText(item.sql_query);
    toastSuccess("Copied!");
  };

  return (
    <div className="glass p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <p>{item.question}</p>
        <span className="text-xs text-gray-400">
          {new Date(item.created_at).toLocaleString()}
        </span>
      </div>

      <p className="text-xs text-blue-400">
        Mode: {item.mode || "query"}
      </p>

      <pre className="text-xs bg-black/40 p-2 rounded truncate">
        {item.sql_query}
      </pre>

      <button onClick={copySQL} className="text-xs flex gap-1 items-center">
        <Copy size={14} /> Copy
      </button>
    </div>
  );
}