import { useState } from "react";
import { generateQuery } from "../services/queryService";

export const useQuery = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const runQuery = async (question: string) => {
    try {
      setLoading(true);
      setError("");
      const res = await generateQuery(question);
      setData(res);
    } catch (err) {
      setError("Failed to fetch query");
    } finally {
      setLoading(false);
    }
  };

  return { runQuery, data, loading, error };
};