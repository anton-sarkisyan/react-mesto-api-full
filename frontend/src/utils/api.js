class Api {
  constructor({ address }) {
    this._address = address;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      "credentials": "include"
    })
      .then(response => this._getResponse(response));
  }

  getInitialCard() {
    return fetch(`${this._address}/cards`, {
      "credentials": "include"
    })
      .then(response => this._getResponse(response));
  }

  editUserData({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
      "credentials": "include"
    })
      .then(response => this._getResponse(response));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      }),
      "credentials": "include"
    }).then(response => this._getResponse(response));
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      "credentials": "include"
    }).then(response => this._getResponse(response));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'PUT',
        "credentials": "include",
      }).then(response => this._getResponse(response));
    } else {
      return fetch(`${this._address}/cards/${id}/likes`, {
        method: 'DELETE',
        "credentials": "include",
      }).then(response => this._getResponse(response));
    }
  }

  changeAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      }),
      "credentials": "include"
    }).then(response => this._getResponse(response));
  }
}

const api = new Api({
  address: 'https://api.mesto.anton-sarkisyan.nomoredomains.club',
})

export default api;
