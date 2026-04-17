import { useState } from "react";
import { Send } from "lucide-react";
import { generateSQL, queryData } from "../../services/queryService";
import { useQueryStore } from "../../store/useQueryStore";
import { toastError } from "../common/Toast";
import Loader from "../common/Loader";

export default function QueryBox() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { setData, mode, context, setContext, uploadedTables } = useQueryStore();

  const handleSubmit = async () => {
    if (!question.trim()) return;

    if (mode === "query" && uploadedTables.length === 0) {
      toastError("Upload data first!");
      return;
    }

    try {
      setLoading(true);

      const res =
        mode === "generate"
          ? await generateSQL(question, context)
          : await queryData(question, context);

      setData(res);
    } catch {
      toastError("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 space-y-5 rounded-xl border border-white/10 shadow-xl">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your database anything..."
        className="w-full h-28 bg-white/5 p-3 rounded-lg border border-white/10 focus:border-blue-500 outline-none"
      />

      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Additional Context (Optional)"
        className="w-full h-20 bg-white/5 p-3 rounded-lg border border-white/10 focus:border-purple-500 outline-none text-xs"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition disabled:opacity-50"
      >
        <Send size={16} />
        {mode === "generate" ? "Generate SQL" : "Run Query"}
      </button>

      {loading && <Loader />}
    </div>
  );
}