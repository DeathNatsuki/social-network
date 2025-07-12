import { useEffect, useState } from 'react';
import { useParams }            from 'react-router-dom';
import { FaUserCircle }         from 'react-icons/fa';
import { CiEdit }               from 'react-icons/ci';

import '../css/Profile.css';

export default function Profile() {
  const { profileId: viewedProfileId } = useParams();

  const [userData,    setUserData]    = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [editMode,    setEditMode]    = useState(false);

  // Поля для редактирования
  const [name,         setName]         = useState('');
  const [profileId,    setProfileId]    = useState('');
  const [description,  setDescription]  = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    // Текущий залогиненный пользователь
    const stored = localStorage.getItem('userData');
    if (!stored) {
      window.location.href = '/register';
      return;
    }
    const me = JSON.parse(stored);
    setCurrentUser(me);

    // Смотрим либо свой профиль, либо заглушку чужого
    if (!viewedProfileId || viewedProfileId === me.profileId) {
      setUserData(me);
      setName(me.name);
      setProfileId(me.profileId);
      setDescription(me.description || '');
      setAvatarPreview(me.avatar || '');
    } else {
      setUserData({
        name:        'Другой пользователь',
        profileId:   viewedProfileId,
        description: '',
        avatar:      ''
      });
    }
  }, [viewedProfileId]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updated = {
      ...currentUser,
      name,
      profileId,
      description,
      avatar: avatarPreview
    };
    // Обновляем и currentUser и userData
    setCurrentUser(updated);
    setUserData(updated);
    localStorage.setItem('userData', JSON.stringify(updated));
    setEditMode(false);
  };

  if (!userData) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>

      {avatarPreview
        ? <img src={avatarPreview} alt="Аватар" className="profile-avatar" />
        : <FaUserCircle size={160} />
      }

      {editMode ? (
        <>
          <input
            className="input-edit"
            type="text"
            value={name}
            placeholder="Имя"
            onChange={e => setName(e.target.value)}
          />
          <input
            className="input-edit"
            type="text"
            value={profileId}
            placeholder="ID профиля"
            onChange={e => setProfileId(e.target.value)}
          />
          <textarea
            className="input-edit"
            value={description}
            placeholder="Описание"
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <button
            className="submit-btn"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </>
      ) : (
        <>
          <p className="name">
            {userData.name}
            {/* Показываем кнопку только для своего профиля */}
            {currentUser.profileId === userData.profileId && (
              <button
                className="Edit-btn"
                onClick={() => setEditMode(true)}
              >
                <CiEdit />
              </button>
            )}
          </p>
          <p className="id">{userData.profileId}</p>
          <p className="description">{userData.description}</p>
        </>
      )}
    </div>
  );
}
