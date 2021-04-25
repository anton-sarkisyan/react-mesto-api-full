function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen}`}
      onClick={(e) => { if (e.target.classList.contains(props.isOpen)) { props.onClose() } }}
    >
      <div className="popup__items popup__items_type_info-tool-tip">
        <button className="popup__close-button" type="button" onClick={props.onClose}></button>
        <img className="popup-icon" src={props.data.icon} alt="#" />
        <p className="popup__title popup__title_type_info-tool-tip">{props.data.title}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;
