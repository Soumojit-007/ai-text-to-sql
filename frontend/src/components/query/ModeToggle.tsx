import { useQueryStore } from "../../store/useQueryStore";

export default function ModeToggle() {
  const { mode, setMode } = useQueryStore();

  return (
    <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
      <button
        onClick={() => setMode("generate")}
        className={`px-4 py-2 rounded-lg text-sm transition ${
          mode === "generate"
            ? "bg-blue-500 text-white shadow-lg"
            : "text-gray-400"
        }`}
      >
        Generate SQL
      </button>

      <button
        onClick={() => setMode("query")}
        className={`px-4 py-2 rounded-lg text-sm transition ${
          mode === "query"
            ? "bg-purple-500 text-white shadow-lg"
            : "text-gray-400"
        }`}
      >
        Query Data
      </button>
    </div>
  );
}