import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chapters from './Chapters';

const TableOfContents = () => {
  const [contents, setContents] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchTableOfContents = async () => {
      try {
        const response = await axios.get('https://api.biblia.com/v1/bible/contents/LEB', {
          params: {
            key: '4279ee5cbb21acc6d777e790998d1af7',
            outputFormat: 'html',
          },
        });
        setContents(response.data.books || []);
      } catch (error) {
        console.error('Error fetching table of contents:', error);
      }
    };

    fetchTableOfContents();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className='scriptures-container'>
        <div className='table-of-contents-container'>
        <h3 className='scriptures-header'>Table of Contents</h3>
      <ul className='table-of-contents'>
        {contents.map((book, index) => (
          <li key={`${index}-${book.passage}`} onClick={() => handleBookClick(book)}>
            {book.passage}
          </li>
        ))}
      </ul>
        </div>
      {selectedBook && <Chapters book={selectedBook} />}
    </div>
  );
};

export default TableOfContents;