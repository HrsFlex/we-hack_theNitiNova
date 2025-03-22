import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

const QueryPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Handle input change in the text field
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle fetch results and chatbot interaction
  const handleFetchResults = async () => {
    if (!query.trim()) {
      setError("Please enter a valid query.");
      setChatResponse("");
      return;
    }

    setLoading(true);
    setError("");
    setChatResponse("");

    const MAX_RETRIES = 3;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant specialized in legal advice.",
              },
              { role: "user", content: query },
            ],
            max_tokens: 500,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response && response.data && response.data.choices) {
          const aiResponse =
            response.data.choices[0].message.content ||
            "No response generated.";
          setChatResponse(aiResponse.trim());
        } else {
          setChatResponse(
            "Sorry, no response could be generated from the model."
          );
        }

        setLoading(false);
        return; // Exit the loop on success
      } catch (err) {
        if (err.response?.status === 429 && attempt < MAX_RETRIES - 1) {
          // Exponential backoff before retrying
          await new Promise((resolve) =>
            setTimeout(resolve, 2000 * (attempt + 1))
          );
          continue; // Retry the request
        }

        setError(
          err.response?.data?.error?.message || "Failed to fetch results."
        );
        console.error("Error:", err);
        break; // Exit loop on non-retryable error
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-green-100 min-h-screen py-12">
      <Container maxWidth="md">
        <Card
          sx={{
            padding: "2rem",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#2e7d32" }}
          >
            AI-Waqeel Query System
          </Typography>

          <TextField
            fullWidth
            label="Enter your query"
            value={query}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            InputProps={{
              style: { color: "#000000" },
            }}
            InputLabelProps={{
              style: { color: "#2e7d32" },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleFetchResults}
            disabled={loading}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#4caf50",
              color: "#ffffff",
              padding: "0.75rem",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Search"
            )}
          </Button>

          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ marginTop: "1rem", fontSize: "0.9rem" }}
            >
              {error}
            </Typography>
          )}
        </Card>

        {chatResponse && (
          <Card
            sx={{
              marginTop: "2rem",
              padding: "1.5rem",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#2e7d32", marginBottom: "0.5rem" }}
            >
              Response from AI:
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#4a4a4a", whiteSpace: "pre-wrap" }}
            >
              {chatResponse}
            </Typography>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default QueryPage;
