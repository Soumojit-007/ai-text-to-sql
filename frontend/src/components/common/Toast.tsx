import toast from "react-hot-toast";

export const toastSuccess = (msg: string) =>
  toast.success(msg, {
    style: {
      background: "#111",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  });

export const toastError = (msg: string) =>
  toast.error(msg, {
    style: {
      background: "#111",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  });