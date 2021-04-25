import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import AuthPage from './AuthPage';
import failRegister from '../images/fail-register.svg';
import successRegister from '../images/success-register.svg';

export default function Register({ handleSignUp, handleInfoToolTip }) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;

    setData(data => ({
      ...data,
      [name]: value
    }))
  }

  function resetForm() {
    setData({
      email: '',
      password: ''
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    handleSignUp(data)
      .then((res) => {
        if (typeof res == 'undefined') {
          handleInfoToolTip({
            title: 'Что-то пошло не так! Попробуйте ещё раз.',
            icon: failRegister
          });
          return;
        }
        handleInfoToolTip({
          title: 'Вы успешно зарегистрировались!',
          icon: successRegister
        });
        resetForm();
        history.push('/sign-in');
      })
  }

  return (
    <AuthPage
      title="Регистрация"
      onChange={handleChange}
      onSubmit={handleSubmit}
      data={data}
    >
      <button
        className="auth-form__submit-button auth-form__submit-button_type_register"
        type="submit"
      >Зарегистрироваться
      </button>
      <p className="auth-form__redirect">Уже зарегистрированы? <Link className="auth-form__link" to="/sign-in">Войти</Link></p>
    </AuthPage>
  )
}

