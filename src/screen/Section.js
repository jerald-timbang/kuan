import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Home.css'; // Ensure this path is correct

const Section = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle popup menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        <h1>Section</h1>
      </header>

      <div className="home-content">
        <h2>ICT 11</h2>
        <div className="month-container">
          <Link to="/calendar/January" className="month-button">January</Link>
          <Link to="/calendar/February" className="month-button">February</Link>
          <Link to="/calendar/March" className="month-button">March</Link>
          <Link to="/calendar/April" className="month-button">April</Link>
          <Link to="/calendar/May" className="month-button">May</Link>
          <Link to="/calendar/June" className="month-button">June</Link>
          <Link to="/calendar/July" className="month-button">July</Link>
          <Link to="/calendar/August" className="month-button">August</Link>
          <Link to="/calendar/September" className="month-button">September</Link>
          <Link to="/calendar/October" className="month-button">October</Link>
          <Link to="/calendar/November" className="month-button">November</Link>
          <Link to="/calendar/December" className="month-button">December</Link>
        </div>
      </div>

      {/* Popup Menu */}
      {showMenu && (
        <div className="popup-overlay" onClick={toggleMenu}>
          <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleMenu}>×</button>
            <ul>
              <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
