import { useQueryStore } from "../../store/useQueryStore";

export default function ModeToggle() {
  const { mode, setMode } = useQueryStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setMode("generate")}
        className={`px-4 py-2 rounded ${
          mode === "generate" ? "bg-white/20" : "bg-white/5"
        }`}
      >
        Generate SQL
      </button>

      <button
        onClick={() => setMode("query")}
        className={`px-4 py-2 rounded ${
          mode === "query" ? "bg-white/20" : "bg-white/5"
        }`}
      >
        Query Data
      </button>
    </div>
  );
}