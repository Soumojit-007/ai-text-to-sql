import { Copy } from "lucide-react";
import { toastSuccess } from "../common/Toast";

export default function HistoryCard({ item }: any) {

  const sql = item.sql_query || item.sql || "No SQL available";
  const copySQL = () => {
    navigator.clipboard.writeText(sql);
    toastSuccess("Copied!");
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-md hover:shadow-lg transition space-y-3">

      {/* Top Row */}
      <div className="flex justify-between items-start gap-2">
        <p className="text-sm text-white font-medium line-clamp-2">
          {item.question}
        </p>

        <span className="text-xs text-gray-400 whitespace-nowrap">
          {new Date(item.created_at).toLocaleString()}
        </span>
      </div>

      {/* Mode Badge */}
      <div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
          {item.mode || "query"}
        </span>
      </div>

      {/* SQL Preview */}
      <pre className="text-xs bg-black/40 p-3 rounded-lg overflow-hidden text-gray-300">
        {item.sql_query}
      </pre>

      {/* Action */}
      <button
        onClick={copySQL}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition"
      >
        <Copy size={14} /> Copy SQL
      </button>
    </div>
  );
}