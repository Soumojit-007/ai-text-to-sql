import { useState } from "react";
import { uploadFiles } from "../../services/queryService";
import { useQueryStore } from "../../store/useQueryStore";
import { toastSuccess, toastError } from "../common/Toast";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const { setUploadedTables } = useQueryStore();

  const handleUpload = async () => {
    if (!files.length) return;

    try {
      const res = await uploadFiles(files);
      setUploadedTables(res.tables || []);
      toastSuccess("Files uploaded successfully");
    } catch {
      toastError("Upload failed");
    }
  };

  return (
    <div className="glass p-4 space-y-3">
      <label htmlFor="file-input" className="block text-sm font-medium">
        Select CSV OR Excel Files
      </label>
      <input
        id="file-input"
        type="file"
        multiple
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        placeholder="Choose CSV files"
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />

      {files.length === 0 && (
        <p className="text-xs text-gray-400">No files selected</p>
      )}
      {files.map((f, i) => (
        <p key={i} className="text-xs">{f.name}</p>
      ))}

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-white/10 rounded"
      >
        Upload CSV
      </button>
    </div>
  );
}