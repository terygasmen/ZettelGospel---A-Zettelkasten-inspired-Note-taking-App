import React from "react";
import { customSort } from "./NotesList";

const Table = ({ notes }) => {
  const sortedNotes = [...notes].sort(customSort);
  return (
    <div className="table-view">
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Title</th>
            <th>Content</th>
            <th>Citation</th>
          </tr>
        </thead>
        <tbody>
          {sortedNotes.map((note) => (
            <tr key={note.id}>
                <td>{note.address}</td>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td>{note.citation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
