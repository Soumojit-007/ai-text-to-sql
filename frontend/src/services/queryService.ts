import api from "./api";

export const generateQuery = async (question: string) => {
  const res = await api.post("/query", { question });
  return res.data;
};
