import React from 'react';

import '../styles/card/card.css';

import { CurrentUserContext } from 'shared-context_shared-library';
import api from "../utils/api";


// Карточка фотографии места. Содержит фотографию, описание и количество лайков
// card - текущая карта для отображения
// onCardClick - функция вызова попапа для отображения картинки в полном размере
// setCard - обновление состояния карточек
function Card({ card, onCardClick, setCards, onDeleteCard}) {

  const currentUser = React.useContext(CurrentUserContext);

  // ===== Хелперы
  // Если текущий пользователь уже поставил лайк
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Если текущий пользователь является владельцем изображения
  const isOwn = card.owner._id === currentUser._id;


  // ===== Стили
  // Стиль отображает нажатие лайка
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;
  const cardStyle = { backgroundImage: `url(${card.link})` };
  // Отображение кнопки удаления изображения
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  // ===== Обработчики кнопок
  // Отображение карты в полном размере
  function handleClick() {
    onCardClick(card);
  }

  // Удаление загруженной карты
  function handleDeleteClick() {
    onDeleteCard(card);
  }

  // Обработчик лайков
  function handleLikeClick() {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <li className="places__item card">
      <div className="card__image" style={cardStyle} onClick={handleClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
