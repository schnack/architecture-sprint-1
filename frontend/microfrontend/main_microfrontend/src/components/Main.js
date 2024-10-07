import React from 'react';

import '../styles/content/content.css';

const Profile = React.lazy(() => import("profile_microfrontend/Profile"));
const Places = React.lazy(() => import("places_microfrontend/Places"));



function Main({ cards, goPath }) {

  function onAddPlace(b) {}

  function onCardClick(b) {}
  function onCardLike(b) {}
  function onCardDelete(b) {}

  return (
    <main className="content">
      <Profile onAddPlace={onAddPlace} />
      <Places cards={cards} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
    </main>
  );
}

export default Main;
