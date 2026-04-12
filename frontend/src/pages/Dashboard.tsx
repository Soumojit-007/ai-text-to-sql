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
      <div className="max-w-4xl mx-auto space-y-6">

        <ModeToggle />

        {mode === "query" && uploadedTables.length === 0 && (
          <div className="glass p-4 text-yellow-400 text-sm">
            Upload data first before querying ⚠️
          </div>
        )}

        <FileUpload />

        <QueryBox />

        {sql && (
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Generated SQL</h3>
            <SQLViewer sql={sql} />
          </div>
        )}

        {mode === "query" && result && (
          <div>
            <h3 className="text-sm text-gray-400 mb-2">Result</h3>
            <ResultTable data={result} />
          </div>
        )}
      </div>
    </Layout>
  );
}