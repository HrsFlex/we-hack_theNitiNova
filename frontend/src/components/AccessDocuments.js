import React, { useState } from "react";
import axios from "axios";
import "./AccessDocuments.css"; // Ensure CSS is properly linked

const AccessDocuments = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAccess = async () => {
    if (!uniqueId.trim() || !password.trim()) {
      setError("⚠️ Please enter both Unique ID and Password.");
      return;
    }

    setLoading(true);
    setError(null);
    setPdfUrl("");

    try {
      console.log("🔹 Sending request to access document:", uniqueId, password);

      const response = await axios.post(
        "http://localhost:8000/api/pdf/access",
        { uniqueId, password },
        { responseType: "blob" }
      );

      console.log("✅ Document fetched successfully!");

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(pdfBlob));
    } catch (error) {
      console.error("❌ Access error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "❌ Failed to access document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-view">
      <h2>📄 Access Your Document</h2>

      <input
        type="text"
        placeholder="🔑 Unique ID"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="🔒 Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <button onClick={handleAccess} disabled={loading}>
        {loading ? "🔄 Accessing..." : "📂 Access Document"}
      </button>

      {error && <p className="error">{error}</p>}

      {pdfUrl && <iframe src={pdfUrl} width="600" height="400" title="PDF Viewer" />}
    </div>
  );
};

export default AccessDocuments;
