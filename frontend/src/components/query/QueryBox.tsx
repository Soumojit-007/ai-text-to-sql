import { useState } from "react";
import { Send } from "lucide-react";
import api from "@/services/api";
import { toastError } from "../common/Toast";
import Loader from "../common/Loader";

export default function QueryBox({ onResult }: any) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      const res = await api.post("/query", { question });
      onResult(res.data);
    } catch (err) {
      toastError("Failed to generate SQL");
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
        className="w-full h-32 bg-transparent outline-none resize-none text-sm"
      />

      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
      >
        <Send size={16} />
        Generate SQL
      </button>

      {loading && <Loader />}
    </div>
  );
}
