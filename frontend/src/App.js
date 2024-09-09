import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [noteContent, setNoteContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notes');
      const result = await response.json();
      setNotes(result);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSaveNote = async () => {
    if (!noteContent) return alert('Note cannot be empty');

    try {
      const response = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteContent }),
      });
      const result = await response.json();
      alert(result.message);
      setNoteContent('');
      fetchNotes(); // Refresh notes list
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notes/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      alert(result.message);
      fetchNotes(); // Refresh notes list
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="app">
      <h1>Add note application</h1>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Enter your note..."
      />
      <button onClick={handleSaveNote}>Save Note</button>
      <button onClick={fetchNotes}>List Notes</button>

      <table className="notes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.content}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default App;
