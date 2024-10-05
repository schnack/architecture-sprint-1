import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./components/Login";

export default function onLogin({ email, password }) {}


ReactDOM.render(<Login onLogin={onLogin}/>, document.getElementById("root"));