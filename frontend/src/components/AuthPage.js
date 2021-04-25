export default function AuthPage({ data, onChange, onSubmit, title, children }) {
  return (
    <div className="auth-form">
      <form
        className="auth-form__items"
        onSubmit={onSubmit}
      >
        <h3 className="auth-form__title">{title}</h3>
        <input
          id="email"
          onChange={onChange}
          className="auth-form__input"
          type="email"
          name="email"
          value={data.email}
          placeholder="Email"
        />
        <input
          id="password"
          onChange={onChange}
          className="auth-form__input"
          value={data.password}
          name="password"
          type="password"
          placeholder="Пароль"
        />
        {children}
      </form>
    </div>
  )
}
