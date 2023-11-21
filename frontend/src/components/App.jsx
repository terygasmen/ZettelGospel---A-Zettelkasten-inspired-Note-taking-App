import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import NotesList from "./NotesList";
import Table from "./Table";
import Stacks from "./Stacks";
import axios from "axios";
import Library from "./Library";

const url = window.location.href;

function App() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [listNotes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTableView, setIsTableView] = useState(false);
  const [isStackView, setIsStackView] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);


  const handleNoteSelected = (noteId) => {
    setSelectedNoteId(noteId);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleToggleTableView = () => {
    setIsTableView(!isTableView);
    setIsStackView(false); 
    setShowLibrary(false);
  };

  const handleToggleStackView = () => {
    setIsStackView(!isStackView);
    setIsTableView(false); 
    setShowLibrary(false);
  };

  const handleLibraryView = () => {
    setShowLibrary(!showLibrary);
    setIsTableView(false);
    setIsStackView(false);
  };

  const fetchNoteById = async (noteId) => {
    try {
      const response = await axios.get(`${url}/notes/${noteId}`);
      setSelectedNote(response.data); 
    } catch (error) {
      console.error("Error fetching note by ID:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (selectedNoteId) {
      fetchNoteById(selectedNoteId);
    }
  }, [selectedNoteId]);
  
  useEffect(() => {
    axios.get(`${url}notes`)
      .then((res) => {
        console.log(res.data);
        const filteredNotes = res.data.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setNotes(filteredNotes);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, [searchTerm]);
  

  function addNote(note) {
    axios.post(`${url}/notes/add`, note)
      .then((response) => {
        setNotes((prevValue) => [...prevValue, response.data]);
        console.log("Note added successfully");
      })
      .catch((err) => console.error("Error adding note:", err));
  } 
  
  function deleteNote(id) {
    axios.delete(`${url}/notes/delete`, { data: { idNote: id } })
      .then(() => {
        const updatedList = listNotes.filter((note) => note._id !== id);
        setNotes(updatedList);
        console.log("Note deleted successfully");
      })
      .catch((err) => console.error("Error deleting note:", err));
  }

  return (
    <div className="container">
      <Header
        handleToggleTableView={handleToggleTableView}
        handleToggleStackView={handleToggleStackView}
        handleLibraryView={handleLibraryView}
      />
      {showLibrary && <Library />}
      {!showLibrary && (
        <>
          <Search onSearch={(term) => setSearchTerm(term)} />
          {isTableView ? (
            <Table
              notes={listNotes.filter((note) =>
                note.content.toLowerCase().includes(searchTerm)
              )}
            />
          ) : isStackView ? (
            <Stacks notes={listNotes} />
          ) : (
            <NotesList
              notes={listNotes}
              addNote={addNote}
              deleteNote={deleteNote}
              selectedNoteId={selectedNoteId}
              onNoteSelected={handleNoteSelected}
              selectedNote={selectedNote}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;