// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link
// import './Home'; // Make sure this path is correct

// const Record = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   // Function to toggle popup menu visibility
//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <div className="home-container">
//       <header className="home-header">
//         <div className="menu-icon" onClick={toggleMenu}>☰</div>
//         <h1>Record</h1>
//       </header>

//       <div className="home-content">
//         <h2>Select Class</h2>

//         <div className="button-container">
//           <button className="class-button">ICT11</button>
//           <button className="class-button">ICT12</button>
//         </div>
//       </div>

//       {/* Popup Menu */}
//       {showMenu && (
//         <div className="popup-overlay" onClick={toggleMenu}>
//           <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={toggleMenu}>×</button>
//             <ul>
//               <li><Link to="/" onClick={toggleMenu}>Home</Link></li> {/* Link back to Home */}
//               <li>Profile</li>
//               <li>Settings</li>
//               <li>Logout</li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Record;

// Record.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Record = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Function to toggle popup menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        <h1>Record</h1>
      </header>

      <div className="home-content">
        <h2>QR-Based Attendance with Parental SMS Alert</h2>
        <div className="button-container">
          <Link to="/section">
            <button className="class-button">ICT11</button>
          </Link>
          <Link to="/section">
            <button className="class-button">ICT12</button>
          </Link>


        </div>
      </div>

      {/* Popup Menu */}
      {showMenu && (
        <div className="popup-overlay" onClick={toggleMenu}>
          <div className="popup-menu" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleMenu}>Close</button>
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

export default Record;


