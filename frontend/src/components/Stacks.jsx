import React, { useState} from "react";

const Stacks = ({ notes }) => {
        const [clickedStack, setClickedStack] = useState(null);
        const [isExpanded, setIsExpanded] = useState(false);

        const handleStackClick = (stackIndex) => {
                setClickedStack(stackIndex);
                setIsExpanded((prevExpandedState) => !prevExpandedState);
        };

        const groupNotesByTopLevelBranch = (notes) => {
                const groupedNotes = {};

                notes.forEach((note) => {
                        const topLevelBranch = note.address.match(/^[a-z]+\d+/i); // Extracting first letter and number combination before any slashes
                        if (topLevelBranch) {
                          const key = topLevelBranch[0].toLowerCase(); // Converting to lowercase for consistency
                          if (!groupedNotes[key]) {
                            groupedNotes[key] = [];
                          }
                          groupedNotes[key].push(note);
                        }
                      });

                return groupedNotes;
        };

        const groupedNotes = groupNotesByTopLevelBranch(notes);
        console.log(groupedNotes);

        return (
                <div className='stacks'>
                  {Object.keys(groupedNotes).map((topLevelBranch, stackIndex) => (
                    <div
                      key={topLevelBranch}
                      className={`stack ${clickedStack === stackIndex ? 'clicked-stack' : ''}`}
                      onClick={() => handleStackClick(stackIndex)}
                    >
                      <div className='stacked-notes'>
                        {isExpanded &&
                                groupedNotes[topLevelBranch].map((note, index) => (
                                <div key={note.id} className='stacked-note note' style={{ zIndex: notes.length - index }}>
                                <div className='note-details'>
                                <section className='note-header'>
                                        <span className='note-address'>{note.address}</span>
                                        <span className='note-title'>{note.title}</span>
                                </section>
                                <span className='note-content'>{note.content}</span>
                                <div className='note-footer'>
                                        <small className='note-citation'>{note.citation}</small>
                                </div>
                                </div>
                                </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            };
            
export default Stacks;
            

