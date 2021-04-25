import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onClose, isOpen, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({ name, about: description });
  }

  return (<PopupWithForm
    name="edit-profile"
    title="Редактировать профиль"
    onClose={onClose}
    isOpen={isOpen && "popup_opened"}
    onSubmit={handleSubmit}
  >
    <fieldset className="popup__item popup__item_type_edit-popup">
      <input
        id="firstname"
        className="popup__text popup__text_type_name"
        type="text"
        name="firstname"
        value={name || ''}
        onChange={handleChangeName}
        required
        minLength="2"
        maxLength="40"
      />
      <span id="firstname-error" className="popup__error"></span>
      <input
        id="job"
        className="popup__text popup__text_type_job"
        name="job"
        type="text"
        value={description || ''}
        onChange={handleChangeDescription}
        required
        minLength="2"
        maxLength="200"
      />
      <span id="job-error" className="popup__error"></span>
      <button className="popup__submit-button popup__submit-button_type_edit-profile" type="submit">Сохранить</button>
    </fieldset>
  </PopupWithForm>)
}

export default EditProfilePopup;
