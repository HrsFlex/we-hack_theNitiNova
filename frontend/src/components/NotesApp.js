import React, { useState, useEffect } from "react";
import "./NotesApp.css";

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [isVisible, setIsVisible] = useState(false); // For the onload effect

  useEffect(() => {
    setIsVisible(true); // Trigger animation on component mount
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
    <div className={`container ${isVisible ? "fade-in" : ""}`}>
      <h1>
        <img src={require("../assets/notes.png")} alt="notes" />
        Notes App
      </h1>
      <button onClick={addNote}>
        <img src={require("../assets/edit.png")} alt="edit" />
        Add Note
      </button>
      <div>
        {notes.map((note) => (
          <div key={note.id} className="input-box">
            <textarea
              value={note.content}
              onChange={(e) => updateNoteContent(note.id, e.target.value)}
            />
            <img
              src={require("../assets/delete.png")}
              alt="Delete"
              onClick={() => deleteNote(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesApp;
