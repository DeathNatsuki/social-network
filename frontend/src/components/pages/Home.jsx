import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersJson = localStorage.getItem('users');
    if (usersJson) {
      setUsers(JSON.parse(usersJson));
    }
  }, []);

  return (
    <div className="home-container">
      <h2>Список аккаунтов</h2>
      {users.length === 0 ? (
        <p>Пока нет ни одного аккаунта. Зарегистрируйся!</p>
      ) : (
        <ul className="accounts-list">
          {users.map((user) => (
            <li key={user.profileId}>
              <Link to={`/profile/${user.profileId}`}>
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} className="avatar-thumb" />
                  : <span className="avatar-fallback">{user.name.charAt(0)}</span>
                }
                <span className="account-name">{user.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
