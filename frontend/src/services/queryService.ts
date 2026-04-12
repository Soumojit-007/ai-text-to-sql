import { form } from "framer-motion/client";
import api from "./api";

export const generateSQL = async(question: string , context?: string) =>{
  const res = await api.post("/generate-sql", { question, context });
  return res.data;
}

export const queryData = async(question:string , context?:string) =>{
  const res = await api.post("/query" , {question , context});
  return res.data;
}

export const uploadFiles = async(files:File[]) =>{
  const formData = new FormData();
  files.forEach((file) => formData.append("files" , file));

  const res = await api.post("/upload", formData ,{
    headers: { "Content-Type" :"multipart/form-data"}
  })

  return res.data;
}