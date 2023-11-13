import React from "react";
import { FaTableColumns } from 'react-icons/fa6';
import { BsFillBookmarkStarFill } from 'react-icons/bs';
import { TbCardsFilled } from 'react-icons/tb';

function Header({ handleToggleTableView, handleToggleStackView, handleLibraryView }) {

  return (
    <nav className="header">
        <a href="/" className="menu-item main-page">
          <img src='logo.png' alt='logo' className='logo'/>
        </a>
        <button 
          className="save menu-item"
          onClick={handleToggleTableView}>
            <FaTableColumns size='1.4em' color='#c1c8ce'/>
        </button>
        <button
          className="menu-item"
          onClick={handleToggleStackView}>
            <TbCardsFilled size='1.6em' color='#c1c8ce' strokeWidth='0.04rem'/>
        </button>
        <button
          className="menu-item"
          onClick={handleLibraryView}>
          <BsFillBookmarkStarFill size='1.4em' color='#c1c8ce'/>
        </button>
    </nav>
  );
}

export default Header;
