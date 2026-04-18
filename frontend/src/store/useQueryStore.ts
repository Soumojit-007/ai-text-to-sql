import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useQueryStore = create<QueryState>()(
  persist(
    (set) => ({
      question: "",
      sql: "",
      result: null,
      mode: "generate",
      context: "",
      uploadedTables: [],

      setData: (data) =>
        set({
          question: data.question,
          sql: data.sql || data.sql_query, // ✅ safe mapping
          result: data.result ?? null,
        }),

      setMode: (mode) => set({ mode }),
      setContext: (context) => set({ context }),

      setUploadedTables: (tables) =>
        set({
          uploadedTables:
            tables && tables.length > 0 ? tables : ["uploaded"], // ✅ fallback
        }),

      clear: () =>
        set({
          question: "",
          sql: "",
          result: null,
        }),
    }),
    {
      name: "query-storage", // 🔥 persists in localStorage
      partialize: (state) => ({
        uploadedTables: state.uploadedTables,
        mode: state.mode,
      }), // ✅ only persist needed fields
    }
  )
);