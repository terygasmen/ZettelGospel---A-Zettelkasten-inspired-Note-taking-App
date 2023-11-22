import React from "react";
import { AiFillMinusCircle } from 'react-icons/ai';
import { Link } from "react-router-dom";

function parseNoteContent(content, onLinkClick) {
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  const elements = [];
  let lastIndex;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const linkedNoteTitle = match[1];
    const linkIndex = match.index;

    elements.push(content.substring(lastIndex, linkIndex));

    elements.push(
      <Link 
        key={linkIndex} 
        to={`/notes/${encodeURIComponent(linkedNoteTitle)}`}
        onClick={() => onLinkClick(linkedNoteTitle)}
      >
        {linkedNoteTitle}
      </Link>
    );

    lastIndex = linkIndex + match[0].length;
  }

  elements.push(content.substring(lastIndex));

  return elements;
}

function Note(props) {

  const links = parseNoteContent(props.content, props.onLinkClick);

  return (
    <div className="note">
      <section className="note-body">
        <section className="note-header">
          <span className='note-address'>{props.address}</span>
          <span className='note-title'>{props.title}</span> 
        </section>
      <span className='note-content'>{links}</span>
      </section>
      <section className="note-footer">
        <small className='note-citation'>{props.citation}</small>
        <button onClick={() => { props.deleteNote(props.id); }}>
          <AiFillMinusCircle
            className='delete-icon'
            size='1.5em'
            color='#c1c8ce'
          />
        </button>
      </section>
    </div>
  );
};

export default Note;
