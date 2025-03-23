import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent scrolling
    return () => (document.body.style.overflow = "auto");
  }, []);

  const updateStorage = (updatedNotes) => {
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    const newNote = { id: Date.now(), content: "" };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    updateStorage(updatedNotes);
  };

  const updateNoteContent = (id, content) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    setNotes(updatedNotes);
    updateStorage(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    updateStorage(updatedNotes);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start bg-[#0E0F1D] p-10 relative">
      {/* Header */}
      <motion.h1
        className="text-white text-4xl font-bold mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✍️Keep Notes
      </motion.h1>

      {/* Add Note Button */}
      <motion.button
        onClick={addNote}
        className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:scale-105 transition-all text-white px-14 py-3 rounded-lg shadow-lg text-md mb-5"
        whileTap={{ scale: 1.2 }}
      >
        ➕ Add Note
      </motion.button>

      {/* Notes Container */}
      <div className="w-full max-w-3xl h-[75%] overflow-auto p-2 space-y-4">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-[#1E1F2A] p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all w-[80%]"
            >
              <textarea
                value={note.content}
                onChange={(e) => updateNoteContent(note.id, e.target.value)}
                className="w-full h-28 bg-transparent text-white p-2 resize-none outline-none border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Write your note..."
                autoFocus
              />
              <motion.button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-400 text-white p-2 rounded-lg transition-all"
                whileTap={{ scale: 0.9 }}
              >
                🗑️
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesApp;
