import React from 'react'
import Card from './Card'

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__items">
          <div className="profile__avatar-overlay">
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
              onClick={props.onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          >
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}>
        </button>
      </section>

      <section className="elements">
        <ul className="elements__grid">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              link={item.link}
              title={item.name}
              likes={item.likes}
              owner={item.owner} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
