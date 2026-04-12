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
    <div className="glass p-6 space-y-4">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your database anything..."
        className="w-full h-28 bg-transparent resize-none"
      />

      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        placeholder="Additional Context (Optional)"
        className="w-full h-20 bg-transparent resize-none text-xs text-gray-400"
      />

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
      >
        <Send size={16} />
        {mode === "generate" ? "Generate SQL" : "Run Query"}
      </button>

      {loading && <Loader />}
    </div>
  );
}