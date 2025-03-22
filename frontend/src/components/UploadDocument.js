import React, { useState } from "react";
import axios from "axios";
import "./UploadDocument.css"; // Assuming you have a CSS file for styling

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/pdf/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // ✅ Ensures proper request
      );

      setResponse(data);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Upload failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="judge-view">
      <h2>Upload Document</h2>
      <input
        type="file"
        accept="application/pdf,image/*,text/plain"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
      
      {response && (
        <div className="response">
          <p><strong>Unique ID:</strong> {response.uniqueId}</p>
          <p><strong>Password:</strong> {response.password}</p>
        </div>
      )}
    </div>
  );
};

export default UploadDocument;
