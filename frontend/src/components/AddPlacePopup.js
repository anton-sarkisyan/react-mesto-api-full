import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen])

  function handleAddCardName(e) {
    setName(e.target.value);
  }

  function handleAddCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__item popup__item_type_add-card">
        <input
          id="titleCard"
          className="popup__text popup__text_type_title-card"
          type="text"
          name="titleCard"
          value={name}
          onChange={handleAddCardName}
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span id="titleCard-error" className="popup__error"></span>
        <input id="urlCard"
          className="popup__text popup__text_type_url-card"
          type="url"
          name="urlCard"
          onChange={handleAddCardLink}
          value={link}
          placeholder="Ссылка на картинку" required
        />
        <span id="urlCard-error" className="popup__error"></span>
        <button className="popup__submit-button popup__submit-button_type_add-form" type="submit">Создать</button>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
