import React, { useState } from "react";
import { BsFillPlusCircleFill } from 'react-icons/bs';

function CreateArea(props) {
  const [inputText, setInputText] = useState({
    address: "",
    title: "",
    content: "",
    citation: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputText((prevValue) => ({ ...prevValue, [name]: value }));
  }

  return (
    <div className="newnote-container">
      <form className="create-note note new">
        <div className="note-header">
          <input
            onChange={handleChange}
            placeholder='address'
            className='note-address'
            name='address'
            value={inputText.address}
          />
          <input
            onChange={handleChange}
            placeholder='title'
            className='note-title'
            name='title'
            value={inputText.title}
          />
        </div>
        <textarea
          onChange={handleChange}
          rows='8'
          cols='10'
          placeholder='type to add a note...'
          name='content'
          value={inputText.content}
        />
        <div className='note-footer'>
          <input
            onChange={handleChange}
            placeholder='citation'
            className='note-citation'
            name='citation'
            value={inputText.citation}
          />
          <button
            onClick={(event) => {
              props.addNote(inputText);
              event.preventDefault();
              setInputText({
                address: "",
                title: "",
                content: "",
                citation: ""
              });
            }}
            className="save"
          >
            <BsFillPlusCircleFill size='1.3em' color='#D8E1E9' />
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
