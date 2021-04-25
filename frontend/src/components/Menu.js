import { Link } from 'react-router-dom';

export default function Menu(props) {
  return (
    <div className={`header__items ${props.isOpen}`}>
      <p className="header__text">{props.mail}</p>
      <Link
        className="header__link header__link_type_main-page"
        onClick={props.signOut}
        to="/sign-in"
      >Выйти</Link>
    </div>
  )
}
