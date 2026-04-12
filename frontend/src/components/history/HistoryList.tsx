import { useEffect, useState } from "react";
import api from "@/services/api";
import Loader from "../common/Loader";
import HistoryCard from "./HistoryCard";
import { toastError } from "../common/Toast";

export default function HistoryList() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/history");
        setData(res.data);
      } catch {
        toastError("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <HistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}