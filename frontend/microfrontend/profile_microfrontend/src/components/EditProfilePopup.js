import React from 'react';

import { CurrentUserContext } from 'shared-context_shared-library';

import '../styles/popup/popup.css';
import '../styles/popup/_is-opened/popup_is-opened.css'
import api from "../utils/api";

const PopupWithForm = React.lazy(() => import('shared_microfrontend/PopupWithForm').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);

function EditProfilePopup({ isOpen, setCurrentUser, onClose }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .setUserInfo({
        name,
        about: description,
      })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        onClose();
      })
      .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"
               value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
