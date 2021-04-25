import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen && "popup_opened"}
      onClose={onClose}
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__item popup__item_type_avatar">
        <input
          ref={avatarRef}
          id="urlAvatar"
          className="popup__text popup__text_type_avatar"
          type="url"
          name="urlAvatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="urlAvatar-error" className="popup__error"></span>
        <button className="popup__submit-button popup__submit-button_type_avatar" type="submit">Сохранить</button>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
