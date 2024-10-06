import React from 'react';
import { CurrentUserContext } from 'shared-context_shared-library';

import '../styles/content/content.css';

const Profile = React.lazy(() => import("profile_microfrontend/Profile"));



function Main({ goPath }) {
  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  function onAddPlace(b) {}

  return (
    <main className="content">
      <Profile onAddPlace={onAddPlace} />
      <h1 style={{color:"white"}}>{currentUser.name}</h1>
    </main>
  );
}

export default Main;
