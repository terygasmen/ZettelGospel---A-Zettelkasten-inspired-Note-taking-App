import React from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

export const customSort = (a, b) => {
	const segmentRegex = /([a-zA-Z]+|-?\d+)/g;

	const getSegments = (address) => {
		if (address === null || address === undefined) {
		    return ['']; // Handle null or undefined addresses by providing a default segment
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

const NotesList = ({ notes, addNote, deleteNote }) => {
    const sortedNotes = [...notes].sort(customSort);
    return (
        <div className='notes-list'>
            <CreateArea addNote={addNote} />
            {sortedNotes.map((note) => (
                <Note
                    key={note._id}
                    id={note._id}
                    address={note.address}
                    title={note.title}
                    content={note.content}
                    citation={note.citation}
                    deleteNote={deleteNote}
                />
            ))}
        </div>
    );
};
    
export default NotesList;
    