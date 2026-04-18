import { useEffect, useState } from "react";
import { getHistory } from "../../services/historyService"; // ✅ FIXED
import Loader from "../common/Loader";
import HistoryCard from "./HistoryCard";
import { toastError } from "../common/Toast";

export default function HistoryList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory(); // ✅ use service
        console.log("HISTORY: " , res);
        
        setData(res.history || res);
      } catch {
        toastError("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <Loader />;

  if (!data.length) {
    return <p className="text-gray-400">No history available</p>;
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}