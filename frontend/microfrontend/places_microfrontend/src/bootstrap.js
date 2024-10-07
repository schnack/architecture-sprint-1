import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Places from "./components/Places";

function onCardClick(b) {}
function onCardLike(b) {}
function onCardDelete(b) {}
const cards = [];

ReactDOM.render(
    <Places cards={cards} onCardClick={onCardClick} onCardLike={onCardLike()} onCardDelete={onCardDelete} />,
    document.getElementById('root')
);