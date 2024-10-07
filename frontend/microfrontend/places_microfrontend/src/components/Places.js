import React from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';

import '../styles/places/places.css';

// Отображает список карт
// cards - список карт
// setCards - управление картами
function Places({ cards, setCards }) {
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setSelectedCard(null);
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
            />
          ))}
        </ul>
      </section>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} ></ImagePopup>
    </>

  );
}

export default Places;
