import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

export function setIsLoggedIn(b) {}
export function setEmail(b) {}
export function goPath(b) {}


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {
                        () => <Redirect to="/signup" />
                    }
                </Route>
                <Route path="/signup">
                    <Register goPath={goPath}/>
                </Route>
                <Route path="/signin">
                    <Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} goPath={goPath}/>
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);