import { useState } from 'react';
import '../css/Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [profileId, setProfileId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      profileId,
      email,
      password,
    };

    // Сохраняем объект как строку
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Регистрация прошла успешно!');
  };

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            placeholder="Введите ваше имя"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileId">Уникальное название профиля</label>
          <input
            type="text"
            id="profileId"
            placeholder="Введите название"
            onChange={(e) => setProfileId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Введите email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Зарегистрироваться</button>
      </form>
    </div>
  );
}
