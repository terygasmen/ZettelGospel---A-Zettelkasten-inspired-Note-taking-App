import React, { useState } from "react";
import Chapters from "./Chapters";
import TableOfContents from "./TableOfContents";

function Library() {
        const [selectedBook, setSelectedBook] = useState(null);
        const handleBookClick = (book) => {
                setSelectedBook(book);
              };

        return (
                        <div className="Library">
      <TableOfContents onBookClick={handleBookClick} />
      {selectedBook && <Chapters book={selectedBook} />}
    </div>
        );
}

export default Library;