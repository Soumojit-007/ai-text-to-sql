import Layout from "../components/layout/Layout";
import QueryBox from "../components/query/QueryBox";
import SQLBlock from "../components/query/SQLBlock";
import ResultTable from "../components/query/ResultTable";
import { useQueryStore } from "../store/useQueryStore";

export default function Dashboard() {
  const { question, sql, result, setData } = useQueryStore();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <QueryBox onResult={setData} />

        {sql && (
          <>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Generated SQL</h3>
              <SQLBlock sql={sql} />
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Result</h3>
              <ResultTable data={result} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
