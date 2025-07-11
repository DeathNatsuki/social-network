import { useEffect, useState } from 'react';
import '../css/Profile.css';
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      window.location.href = '/register';
    }
  }, []);

 if (!userData) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Загрузка...</p>
    </div>
  );
}



  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      <FaUserCircle size={200}/>
      <p><strong></strong> {userData.name}</p>
    </div>
  );
}
