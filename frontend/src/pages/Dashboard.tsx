import Layout from "../components/layout/Layout";
import QueryBox from "../components/query/QueryBox";
import ResultTable from "../components/query/ResultTable";
import SQLViewer from "../components/query/SQLViewer";
import ModeToggle from "../components/query/ModeToggle";
import FileUpload from "../components/upload/FileUpload";
import { useQueryStore } from "../store/useQueryStore";

export default function Dashboard() {
  const { sql, result, mode, uploadedTables } = useQueryStore();

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto space-y-6 px-2 md:px-0">

        {/* Mode Toggle */}
        <ModeToggle />

        {/* Warning */}
        {mode === "query" && uploadedTables.length === 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl">
            ⚠️ Upload data first before querying
          </div>
        )}

        {/* Upload */}
        <FileUpload />

        {/* Query */}
        <QueryBox />

        {/* SQL Output */}
        {sql && (
          <div className="space-y-2">
            <h3 className="text-sm text-gray-400 tracking-wide">
              Generated SQL
            </h3>

            <SQLViewer sql={sql} />
          </div>
        )}

        {/* Result */}
        {mode === "query" && result && (
          <div className="space-y-2">
            <h3 className="text-sm text-gray-400 tracking-wide">
              Result
            </h3>

            <ResultTable data={result} />
          </div>
        )}
      </div>
    </Layout>
  );
}