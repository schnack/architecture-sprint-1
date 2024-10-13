import React from 'react';

import '../vendor/fonts.css';
import '../vendor/normalize.css';
import '../styles/popup/popup.css';
import '../styles/popup/_is-opened/popup_is-opened.css'
import api from "../utils/api";

const PopupWithForm = React.lazy(() => import('shared_microfrontend/PopupWithForm').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);

// Форма добавления новой фотографии
// isOpen - отображать попап?
// cards - текущий список карт
// setCards - обновление списка карт
// onClose - Скрывает попап
function AddPlacePopup({ isOpen, cards, setCards, onClose }) {
  // Поля формы
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  // Добавляет новую карту
  function handleSubmit(e) {
    e.preventDefault();
    api
      .addCard({name, link})
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        onClose();
      })
      .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} title="Новое место" name="new-card">
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
