import React from 'react';

import '../styles/popup/popup.css';
import '../styles/popup/_is-opened/popup_is-opened.css'
import api from "host_microfrontend/src/utils/api";

const PopupWithForm = React.lazy(() => import('shared_microfrontend/PopupWithForm').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);

// Попап обновления аватара
// isOpen - показывать попап
// setCurrentUser - обновление текущего пользователя
// onClose - закрытие попапа
function EditAvatarPopup({ isOpen, setCurrentUser, onClose }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    api
      .setUserAvatar({
        avatar: inputRef.current.value,
      })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        onClose();
      })
      .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm
      isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
               className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
               required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
