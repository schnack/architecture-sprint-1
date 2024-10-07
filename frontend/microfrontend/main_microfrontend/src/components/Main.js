import React from 'react';

import '../styles/content/content.css';

const Profile = React.lazy(() => import('profile_microfrontend/Profile').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);
const Places = React.lazy(() => import('places_microfrontend/Places').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);
const AddPlacePopup = React.lazy(() => import('places_microfrontend/AddPlacePopup').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);


function Main({ setCurrentUser, cards, setCards }) {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  function showAddPlace() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
  }

  return (
    <main className="content">
      <Profile setCurrentUser={setCurrentUser} onAddPlace={showAddPlace} />
      <Places cards={cards} setCards={setCards} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} cards={cards} setCards={setCards} onClose={closeAllPopups} />
    </main>
  );
}

export default Main;
