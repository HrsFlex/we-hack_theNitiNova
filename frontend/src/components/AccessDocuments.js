import React, { useState } from "react";
import axios from "axios";
import "./AccessDocuments.css"; // Assuming you have a CSS file for styling

const AccessDocuments = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleAccess = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/pdf/access",
      { uniqueId, password },
      { responseType: "blob" }
    );

    const pdfBlob = new Blob([data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="lawyer-view">
      <h2>Access Document</h2>
      <input
        placeholder="Unique ID"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAccess}>Access Document</button>
      {pdfUrl && (
        <iframe src={pdfUrl} width="600" height="400" title="PDF Viewer" />
      )}
    </div>
  );
};

export default AccessDocuments;
