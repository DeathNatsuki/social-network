import { Link } from "react-router-dom";
import "./css/NavBar.css";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
function Navbar() {
  return (
    <nav>
      <Link to="/">
      <icon><FaHome/></icon>
      
      Главная</Link>  
      <Link to="/profile">
      <icon><FaUser/></icon>
      Профиль</Link>
    </nav>
  );
}

export default Navbar;
