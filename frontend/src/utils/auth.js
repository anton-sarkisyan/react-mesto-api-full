const address = 'http://mesto.anton-sarkisyan.nomoredomains.club';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export function signUp({ password, email }) {
  return fetch(`${address}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
    "credentials": "include"
  })
    .then(responseCheck)
    .then(response => response);
}

export function signIn({ password, email }) {
  return fetch(`${address}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      password: password,
      email: email
    }),
    "credentials": "include"
  })
    .then(responseCheck)
    .then(response => response);
}

export function getData() {
  return fetch(`${address}/users/me`, {
    "credentials": "include"
  })
    .then(responseCheck)
    .then(response => response);
}

export function logout() {
  return fetch(`${address}/users/logout`, {
    method: 'DELETE',
    "credentials": "include"
  })
    .then(responseCheck)
    .then(response => response);
}
