import React, {Suspense} from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";

import { CurrentUserContext } from 'shared-context_shared-library';

import '../vendor/fonts.css';
import '../vendor/normalize.css';

const Login = React.lazy(() => import('auth_microfrontend/Login').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);
const Register = React.lazy(() => import('auth_microfrontend/Register').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);
const Main = React.lazy(() => import('main_microfrontend/Main').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
  })
);

function App() {
  const [cards, setCards] = React.useState([]);
  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);


  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  function goPath(path) {
    history.push(path)
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            setCurrentUser={setCurrentUser}
            cards={cards}
            setCards={setCards}
            goPath={goPath}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Suspense fallback={"loading..."}>
              <Register goPath={goPath} />
            </Suspense>
          </Route>
          <Route path="/signin">
            <Suspense fallback={"loading..."}>
              <Login setIsLoggedIn={setIsLoggedIn} setGlobalEmail={setEmail} goPath={goPath}/>
            </Suspense>
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
