import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';

import '../vendor/fonts.css';
import '../vendor/normalize.css';
import '../styles/places/places.css';
import api from "../utils/api";

const PopupWithForm = React.lazy(() => import('shared_microfrontend/PopupWithForm').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);

// Отображает список карт
// cards - список карт
// setCards - управление картами
function Places({ cards, setCards }) {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedDeleteCard, setSelectedDeleteCard] = React.useState(null);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeleteClick(card) {
    setSelectedDeleteCard(card);
    setIsDeleteCardPopupOpen(true)
  }

  function closeAllPopups() {
    setSelectedCard(null);
    setSelectedDeleteCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  // Удаление загруженной карты
  function submitDeleteClick(e) {
    e.preventDefault();
    api
      .removeCard(selectedDeleteCard._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== selectedDeleteCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <section className="places page__section">
        <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              setCards={setCards}
              onDeleteCard={handleDeleteClick}
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} ></ImagePopup>
      <PopupWithForm isOpen={isDeleteCardPopupOpen} onSubmit={submitDeleteClick} onClose={closeAllPopups} title="Вы уверены?" name="remove-card" buttonText="Да" />
    </>

  );
}

export default Places;
