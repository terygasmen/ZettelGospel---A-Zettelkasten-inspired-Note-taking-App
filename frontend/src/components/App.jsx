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
  
  useEffect(() => {
    axios.get(url + "notes")
      .then((res) => {
        const filteredNotes = res.data.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setNotes(filteredNotes);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, [searchTerm]);


  function addNote(note) {
    setNotes((prevValue) => [...prevValue, note]);
    axios.post(url + "add", note)
      .catch((err) => console.error("Error adding note:", err));
  }

  function deleteNote(id) {
    const updatedList = listNotes.filter((note) => note._id !== id);
    setNotes(updatedList);
    axios.post(url + "delete", { idNote: id })
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
          <Search onSearch={handleSearch} />
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
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;