function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}
      onClick={(e) => { if (e.target.classList.contains(props.isOpen)) { props.onClose() } }}>
      <form className={`popup__items popup__items_${props.name}`} name={props.name} onSubmit={props.onSubmit}>
        <button className={`popup__close-button popup__close-button_type_${props.name}`} onClick={props.onClose} type="button"></button>
        <h3 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h3>
        {props.children}
      </form>
    </div>
  )
}

export default PopupWithForm;
