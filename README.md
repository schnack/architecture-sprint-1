
### Текущая структура проекта


- index.js - основной загрузчик приложения
  - App.js - отвечает за состояние приложения и маршрутизацию
      - Header.js - отвечает за заголовок в верхней части страницы.
      - Router.js - отвечает за маршрутизацию внутри страницы (переключает login/register/main)
          - ProtectedRoute.js - предотвращает не авторизованным пользователям попасть на основную страницу без авторизации
              - Main.js - основная страница приложения для отображения контента
                  - Card.js - отображение карточек мест
          - Login.js - форма авторизации
          - Register.js - форма регистрации на сайте
      - Footer.js - нижняя часть страницы с информацией о компании
      - EditProfilePopup.js - форма редактирования профиля пользователя обрамляется PopupWithFrom.js с общими элементами формы
      - AddPlacePopup.js - форма добавления фотографии нового места обрамляется PopupWithFrom.js с общими элементами формы
      - PopupWithForm.js - форма подтверждения удаления
      - EditAvatarPopup.js - форма обновления аватарка пользователя PopupWithFrom.js с общими элементами формы
      - ImagePopup.js - отображение увеличенного изображения при нажатии на карту места
      - InfoTooltip.js - Отображает сообщение сообщения о результатах авторизации/регистрации


### Выбор потерна декомпозиции (1 Уровень)

В проекте используется только один фреймворк React по этому я выбрал Webpack Module Federation.
Module Federation повторно не загружает общие зависимости. Это позволит сэкономить оперативную память клиента и ускорит 
первую загрузку страницы пока отсутствует кэш браузера.


### Новая архитектура (2 уровень)

Монолит был разбит на следующие микрофронтенды:

#### host_microfrontend 
Является Run-Time объединителем микрофронтендов на стороне клиента.
Сюда я добавил Footer и Header потому что они содержат мало логики для выделения в отдельный минифронтенд и отлично 
вписываются в "контейнерность" этого микрофронтенда.

Состав:
  - App - Состояние приложения и маршрутизация
  - ProtectedRoute - Часть маршрутизации. Перенаправляет не авторизованных пользователей на страницу авторизации
  - Header - Верхняя часть страницы. Присутствует на всех страницах приложения
  - Footer - Нижняя часть страницы. Присутствует на всех страницах приложения
  
#### auth_microfrontend 
Микрофронтенд отвечающий за авторизацию и регистрацию пользователей. 
У страниц Login и Register одинаковые стили, поля форм и они совместно используют popup InfoTooltip с utils/auth.js

В будущем если при регистрации нужно будет собирать больше информации о пользователе, то страницу Register я бы перенес 
в микрофронтенд profile т.к. там должна находиться все что связанно с данными аккаунта. 

Состав:
  - InfoTooltip - попап оповещения пользователя об успешной/не успешной авторизации
  - Login - Страница авторизации.
  - Register - Страница регистрации.

#### main_microfrontend 
Основная страница приложения. В монолитной версии этой страницы были объеденины представления профилей и фотографий мест.
Я принял решение разбить его на 2 независимых микрофронтенда profile и places, а саму страницу main сделать контейнером 
со своими стилями.

Состав:
  - Main - Контейнер для отображения основного контента страницы.

#### places_microfrontend
Этот микрофронтенд был выделен из монолитной страницы Main.js. 
Он содержит всю логику управления фотографиями.

Состав:
  - AddPlacePopup - Компонент добавления описания и картинки
  - Card - Компонент отображает карточку места с названием и лайками.
  - ImagePopup - Popup для отображения картинки в оригинальном размере.
  - Places - Компонент в котором отрисовываются карточки Card.

#### profile_microfrontend
Микрофронтенд содержит логику управления профилем пользователя. 

Состав:
  - EditAvatarPopup - Форма для изменения аватара пользователя
  - EditProfilePopup - Форма редактирования имени и профессии
  - Profile - Компонент отображает профиль пользователя

#### shared_microfrontend 
Микрофронтенд содержит общий декоратор формы, который используют profile, places.

Состав:
 - PopupWithForm - Общий декоратор формы для изменения профиля пользователя или фотографии мест.

#### shared-library
Общая библиотека разделяющая контекст между микрофронтендами

### Запуск компоновки