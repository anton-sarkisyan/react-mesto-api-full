import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (`element__button ${isLiked ? 'element__button_active' : ' '}`)
  const isOwn = props.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button_type_visible' : 'element__delete-button_type_hidden'}`
  );

  return (
    <li className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => { props.onCardDelete(props) }}>
      </button>
      <img
        className="element__photo"
        src={props.link}
        alt={props.title}
        onClick={() => { props.onCardClick(props) }}
      />
      <div className="element__description">
        <h2 className="element__title">{props.title}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => { props.onCardLike(props) }}>
        </button>
        <span className="element__count-like">{props.likes.length}</span>
      </div>
    </li>
  )
}

export default Card;
