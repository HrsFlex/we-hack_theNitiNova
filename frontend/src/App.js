import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import QueryPage from "./components/QueryPage";
import Welcome from "./components/Welcome";
import UploadDocument from "./components/UploadDocument";
import AccessDocuments from "./components/AccessDocuments";
import FindLawyers from "./components/FindLawyers";
import OtherPages from "./components/OtherPages";
import BnsSection from "./components/BnsSection";
import LiveHearing from "./components/LiveHearing";
import NotesApp from "./components/NotesApp";
import Constitution from "./components/Constitution";

import "./App.css";

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  // Track mouse movement
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 10, // Adjusted for center alignment
      y: mousePosition.y - 10,
      scale: 1,
      backgroundColor: "transparent",
      transition: { duration: 0.1 },
    },
    text: {
      x: mousePosition.x - 20, // Larger offset for bigger cursor
      y: mousePosition.y - 20,
      scale: 1.5,
      backgroundColor: "blue",
      mixBlendMode: "difference",
      transition: { duration: 0.1 },
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div className="app">
      {/* Custom cursor */}
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />

      {/* Router setup */}
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <Welcome />
                <OtherPages />
              </div>
            }
          />
          <Route
            path="/bns-section"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <BnsSection />
              </div>
            }
          />
          <Route
            path="/constitution"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <Constitution />
              </div>
            }
          />
          <Route
            path="/live-hearings"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <LiveHearing />
              </div>
            }
          />
          <Route
            path="/query-page"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <QueryPage />
              </div>
            }
          />
          <Route
            path="/upload-documents"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <UploadDocument />
              </div>
            }
          />
          <Route
            path="/access-documents"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <AccessDocuments />
              </div>
            }
          />
          <Route
            path="/find-lawyers"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <FindLawyers />
              </div>
            }
          />
          <Route
            path="/keep-notes"
            element={
              <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <NotesApp />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


