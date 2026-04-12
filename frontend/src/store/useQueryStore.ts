import { create } from "zustand";

interface QueryState {
  question: string;
  sql: string;
  result: any;
  mode: "generate" | "query";
  context: string;
  uploadedTables: string[];

  setData: (data: any) => void;
  setMode: (mode: "generate" | "query") => void;
  setContext: (context: string) => void;
  setUploadedTables: (tables: string[]) => void;
  clear: () => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  question: "",
  sql: "",
  result: null,
  mode: "generate",
  context: "",
  uploadedTables: [],

  setData: (data) =>
    set({
      question: data.question,
      sql: data.sql,
      result: data.result,
    }),

  setMode: (mode) => set({ mode }),
  setContext: (context) => set({ context }),
  setUploadedTables: (tables) => set({ uploadedTables: tables }),

  clear: () => set({ question: "", sql: "", result: null }),
}));