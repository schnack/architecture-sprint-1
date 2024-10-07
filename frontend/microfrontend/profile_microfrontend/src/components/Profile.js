import React from 'react';
import { CurrentUserContext } from 'shared-context_shared-library';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

import '../styles/profile/profile.css';

function Profile({setCurrentUser, onAddPlace}) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
      React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
      React.useState(false);


  function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = currentUser.avatar !== undefined? { backgroundImage: `url(${currentUser.avatar})` }: {};

  return (
      <>
          <section className="profile page__section">
              <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
              <div className="profile__info">
                  <h1 className="profile__title">{currentUser.name}</h1>
                  <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
                  <p className="profile__description">{currentUser.about}</p>
              </div>
              <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
          </section>

          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              setCurrentUser={setCurrentUser}
              onClose={closeAllPopups}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              setCurrentUser={setCurrentUser}
              onClose={closeAllPopups}
          />
      </>
  );
}

export default Profile;
