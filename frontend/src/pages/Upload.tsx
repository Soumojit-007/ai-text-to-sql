import Layout from "../components/layout/Layout";
import FileUpload from "../components/upload/FileUpload";

export default function Upload() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-lg mb-4">Upload CSV Files</h2>
        <FileUpload />
      </div>
    </Layout>
  );
}