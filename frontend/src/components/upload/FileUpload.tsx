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
    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 space-y-4">

      <label className="cursor-pointer flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 hover:bg-white/5 transition">
        <span className="text-sm text-gray-400">
          Click or drag files to upload
        </span>

        <input
          type="file"
          multiple
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="hidden"
        />
      </label>

      {files.length === 0 ? (
        <p className="text-xs text-gray-400 text-center">
          No files selected
        </p>
      ) : (
        files.map((f, i) => (
          <p key={i} className="text-xs text-gray-300">
            {f.name}
          </p>
        ))
      )}

      <button
        onClick={handleUpload}
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
      >
        Upload Files
      </button>
    </div>
  );
}