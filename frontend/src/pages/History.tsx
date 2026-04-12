import Layout from "../components/layout/Layout";
import HistoryList from "../components/history/HistoryList";

export default function History() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Query History</h2>
        <HistoryList />
      </div>
    </Layout>
  );
}