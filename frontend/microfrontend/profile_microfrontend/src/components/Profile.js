import React from 'react';
import { CurrentUserContext } from 'shared-context_shared-library';
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";

import '../styles/profile/profile.css';

function Profile({onAddPlace}) {
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

    function handleUpdateUser(userUpdate) {
        // api
        //     .setUserInfo(userUpdate)
        //     .then((newUserData) => {
        //         setCurrentUser(newUserData);
        //         closeAllPopups();
        //     })
        //     .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(avatarUpdate) {
        // api
        //     .setUserAvatar(avatarUpdate)
        //     .then((newUserData) => {
        //         setCurrentUser(newUserData);
        //         closeAllPopups();
        //     })
        //     .catch((err) => console.log(err));
    }

  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

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
              onUpdateUser={handleUpdateUser}
              onClose={closeAllPopups}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
          />
      </>
  );
}

export default Profile;
