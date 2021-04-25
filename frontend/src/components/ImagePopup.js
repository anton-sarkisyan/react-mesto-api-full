function ImagePopup(props) {
  return (
    <div className={`popup popup_type_open-photo ${props.isOpen}`}
      onClick={(e) => { if (e.target.classList.contains(props.isOpen)) { props.onClose() } }}
    >
      <div className="popup__items popup__items_type_open-photo" name="openPhotoForm">
        <button className="popup__close-button popup__close-button_type_open-photo" type="button" onClick={props.onClose}></button>
        <img className="popup__big-photo" src={props.card.link} alt="#" />
        <p className="popup__description">{props.card.title}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
