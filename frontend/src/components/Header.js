import logoMesto from '../images/logo-mesto.svg';
import menu from '../images/menu-mobile.svg';
import closeMenu from '../images/Close-Icon.svg';
import Menu from './Menu';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ signOut, userEmail, handleMobileMenu, isOpen }) {
  return (
    <Switch>
      <Route path="/sign-in">
        <header className="header">
          <img src={logoMesto} alt="Логотип Mesto" className="header__logo" />
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        </header>
      </Route>
      <Route path="/sign-up">
        <header className="header">
          <img src={logoMesto} alt="Логотип Mesto" className="header__logo" />
          <Link className="header__link" to="/sign-in">Вход</Link>
        </header>
      </Route>
      <Route path="/react-mesto-auth">
        {isOpen && <Menu mail={userEmail} signOut={signOut} isOpen={isOpen} />}
        <header className="header">
          <img src={logoMesto} alt="Логотип Mesto" className="header__logo" />
          <div className={isOpen ? "header__close-button " : "header__menu-mobile"} onClick={handleMobileMenu} />
          <Menu mail={userEmail} signOut={signOut} />
        </header>
      </Route>
    </Switch>
  )
}

export default Header;
