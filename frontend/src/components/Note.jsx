import React from "react";
import { AiFillMinusCircle } from 'react-icons/ai';

function Note(props) {
  return (
    <div className="note">
      <section className="note-body">
        <section className="note-header">
          <span className='note-address'>{props.address}</span>
          <span className='note-title'>{props.title}</span>
        </section>
      <span className='note-content'>{props.content}</span>
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
