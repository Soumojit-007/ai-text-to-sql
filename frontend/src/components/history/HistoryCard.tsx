import { useState } from "react";
import { Copy } from "lucide-react";
import { toastSuccess } from "../common/Toast";

export default function HistoryCard({ item }: any) {
  const [open, setOpen] = useState(false);

  const copySQL = () => {
    navigator.clipboard.writeText(item.sql_query);
    toastSuccess("SQL copied!");
  };

  return (
    <div className="glass p-4 space-y-2">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer flex justify-between"
      >
        <p className="text-sm">{item.question}</p>
        <span className="text-xs text-gray-400">
          {new Date(item.created_at).toLocaleString()}
        </span>
      </div>

      {open && (
        <div className="space-y-2">
          <pre className="text-xs bg-black/40 p-2 rounded">
            {item.sql_query}
          </pre>

          <button
            onClick={copySQL}
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-white"
          >
            <Copy size={14} />
            Copy SQL
          </button>
        </div>
      )}
    </div>
  );
}
