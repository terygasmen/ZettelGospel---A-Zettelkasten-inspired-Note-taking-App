import React, {useEffect, useState} from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

export const customSort = (a, b) => {
	const segmentRegex = /([a-zA-Z]+|-?\d+)/g;

	const getSegments = (address) => {
		if (address === null || address === undefined) {
		    return [''];
		}
		const segments = address.match(segmentRegex);
		return segments ? segments.map(segment => isNaN(segment) ? segment.toLowerCase() : parseInt(segment)) : [''];
	};
	    
    
	const segmentsA = getSegments(a.address);
	const segmentsB = getSegments(b.address);
    
	for (let i = 0; i < Math.min(segmentsA.length, segmentsB.length); i++) {
	    if (segmentsA[i] !== segmentsB[i]) {
		return segmentsA[i] < segmentsB[i] ? -1 : 1;
	    }
	}
    
	return segmentsA.length - segmentsB.length;
};

const NotesList = ({ 
    notes, 
    addNote, 
    deleteNote, 
    selectedNoteId, 
    onNoteSelected 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const sortedNotes = [...notes].sort(customSort);
    
    const handleLinkClick = (linkedNoteTitle) => {
        onNoteSelected(linkedNoteTitle);

    };

    useEffect(() => {
        const fetchSelectedNote = async () => {
            if (selectedNoteId) {
                try {
                    const response = await axios.get(`/notes/${selectedNoteId}`);
                    setSelectedNote(response.data);
                } catch (error) {
                    console.error("Error fetching selected note:", error);
                }
            } else {
                setSelectedNote(null);
            }
        };
        fetchSelectedNote();
    }, [selectedNoteId]);

return (
    <div className="notes-list">
      <CreateArea addNote={addNote} />
      {selectedNote ? (
        // Display the selected note if available
        <Note
          key={selectedNote._id}
          id={selectedNote._id}
          address={selectedNote.address}
          title={selectedNote.title}
          content={selectedNote.content}
          citation={selectedNote.citation}
          deleteNote={deleteNote}
        />
      ) : (
        // Display all notes if no specific note is selected
        sortedNotes.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            address={note.address}
            title={note.title}
            content={note.content}
            citation={note.citation}
            deleteNote={deleteNote}
            onNoteSelected={onNoteSelected}
            onLinkClick={handleLinkClick}
          />
        ))
      )}
    </div>
  );
};

export default NotesList;             

