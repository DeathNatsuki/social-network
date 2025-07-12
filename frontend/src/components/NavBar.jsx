import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import './css/NavBar.css';

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  return (
    <nav>
      <Link to="/" className="nav-link">
        <span className="nav-icon"><FaHome/></span>
        <span className="nav-text">Главная</span>
      </Link>

      {currentUser ? (
        <Link to={`/profile/${currentUser.profileId}`} className="nav-link">
          <span className="nav-icon"><FaUser/></span>
          <span className="nav-text">Профиль</span>
        </Link>
      ) : (
        <Link to="/login" className="nav-link">
          <span className="nav-icon"><FaUser/></span>
          <span className="nav-text">Войти</span>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
