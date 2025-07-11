import { useState } from 'react';
import '../css/Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [profileId, setProfileId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // === ПРОВЕРКИ ===
    if (!name.trim() || !profileId.trim() || !email.trim() || !password.trim()) {
      return setError('Пожалуйста, заполните все поля.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Введите корректный email.');
    }

    if (password.length < 6) {
      return setError('Пароль должен быть не менее 6 символов.');
    }

    // === СОХРАНЕНИЕ ===
    const userData = {
      name,
      profileId,
      email,
      password,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    setError('');
    window.location.href = '/profile'; // переход на профиль
  };

  return (
    <div className="form-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleFormSubmit}>
        {error && <p className="error">{error}</p>}

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
            placeholder="Введите ID профиля"
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
