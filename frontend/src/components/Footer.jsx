import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Tery Gasmen | BYUI CIT 490 | Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
