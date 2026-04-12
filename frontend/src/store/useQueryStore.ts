import {create} from "zustand";

interface QueryState {
  question: string;
  sql: string;
  result: any;
  setData: (data: any) => void;
  clear: () => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  question: "",
  sql: "",
  result: null,
  setData: (data) =>
    set({
      question: data.question,
      sql: data.sql,
      result: data.result,
    }),
  clear: () => set({ question: "", sql: "", result: null }),
}));
