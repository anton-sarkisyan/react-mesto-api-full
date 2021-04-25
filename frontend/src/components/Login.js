import React from 'react';
import AuthPage from './AuthPage';
import { useHistory } from 'react-router-dom'

export default function Login({ signIn }) {
  const history = useHistory();
  const [data, setData] = React.useState({
    email: '',
    password: ''
  })

  function resetForm() {
    setData({
      email: '',
      password: ''
    })
  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    setData(data => ({
      ...data,
      [name]: value
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!data.email || !data.password) {
      return;
    }

    signIn(data)
    .then(() => resetForm())
    .then(() => history.push('/'));
  }

  return (
    <AuthPage
      onChange={handleChange}
      onSubmit={handleSubmit}
      title="Вход"
      data={data}
    >
      <button
        className="auth-form__submit-button auth-form__submit-button_type_login"
        type="submit">Войти</button>
    </AuthPage>
  )
}

