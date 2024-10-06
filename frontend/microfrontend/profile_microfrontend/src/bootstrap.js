import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Profile from "./components/Profile";

export function onEditProfile(b) {}
export function onAddPlace(b) {}
export function onEditAvatar(b) {}

ReactDOM.render(
    <Profile onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} />,
    document.getElementById('root')
);