import { useState } from 'react';
import '../css/Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [profileId, setProfileId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profileIdError, setProfileIdError] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (profileId.trim().length < 3) {
      setProfileIdError('Название профиля должно содержать минимум 3 буквы');
      return;
    } else {
      setProfileIdError('');
    }

    const userData = {
      name,
      profileId,
      email,
      password,
      avatar: avatarPreview || '',
    };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profileId">Уникальное название профиля</label>
          <input
            type="text"
            id="profileId"
            placeholder="Введите название"
            value={profileId}
            onChange={(e) => {
              setProfileId(e.target.value);
              if (e.target.value.trim().length >= 3) {
                setProfileIdError('');
              }
            }}
          />
          {profileIdError && (
            <p className="error-message">{profileIdError}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="avatar">Аватарка</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Аватарка"
              className="avatar-preview"
            />
          )}
        </div>

        <button type="submit" className="submit-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
