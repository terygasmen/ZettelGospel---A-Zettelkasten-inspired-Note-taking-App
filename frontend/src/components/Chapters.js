import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chapters = ({ book }) => {
  const { passage, chapters } = book;
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [passages, setPassages] = useState([]);

  const extractChapterNumber = (chapter) => {
    if (typeof chapter === 'object' && chapter.passage) {
      const match = chapter.passage.match(/\d+/);
      return match ? `Chapter ${match[0]}` : 'Unknown';
    } else {
      const match = chapter.match(/\d+/);
      return match ? `Chapter ${match[0]}` : 'Unknown';
    }
  };

  const handleChapterClick = async (chapter) => {
    try {
      const response = await axios.get(`https://api.biblia.com/v1/bible/content/LEB.html`, {
        params: {
          passage: chapter.passage,
          key: '4279ee5cbb21acc6d777e790998d1af7',
          outputFormat: 'json',
        },
      });
  
      console.log('Chapters API Response:', response);
  
      // Use a DOM parser to extract text content from HTML
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(response.data, 'text/html');
      const passages = Array.from(htmlDoc.body.childNodes).map((node) => node.textContent);
  
      // Update the state with the selected chapter and passages
      setSelectedChapter(chapter);
      setPassages(passages);
  
      // Log the state immediately after the update
      console.log('Passages State After Update:', passages);
    } catch (error) {
      console.error('Error fetching passages:', error);
    }
  };
  
  
  
  
  

  return (
          <div className={`chapters-and-passages-container ${selectedChapter ? 'with-passages' : ''}`}>
                <div className='chapters-container'>
                <h3 className='scriptures-header'>{passage}</h3>
                <ul className='chapters'>
                {chapters.map((chapter, index) => (
                        <li key={index} onClick={() => handleChapterClick(chapter)}>
                        {extractChapterNumber(chapter)}
                        </li>
                ))}
                </ul>
                </div>
            {selectedChapter && (
              <div className='passages-container'>
                <h3 className='scriptures-header'>{extractChapterNumber(selectedChapter)}</h3>
                <ul className='passages'>
                  {passages.map((passage, index) => (
                    <li key={index}>{passage}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      );
    };

export default Chapters;
