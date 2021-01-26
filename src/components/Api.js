export default class Api {
  constructor({ address, token, cohortId }) {
    this._address = address;
    this._token = token;
    this._cohort = cohortId;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }


  getUserData() {
    return fetch(`${this._address}/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(response => this._getResponse(response));
  }

  getInitialCard() {
    return fetch(`${this._address}/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(response => this._getResponse(response));
  }

  editUserData(data) {
    return fetch(`${this._address}/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.firstname,
        about: data.job
      })
    })
      .then(response => this._getResponse(response));
  }

  addNewCard(data) {
    return fetch(`${this._address}/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.titleCard,
        link: data.urlCard
      })
    }).then(response => this._getResponse(response));
  }

  deleteCard(id) {
    return fetch(`${this._address}/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(response => this._getResponse(response));
  }

  addLikeCard(id) {
    return fetch(`${this._address}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      },
    }).then(response => this._getResponse(response));
  }

  deleteLikeCard(id) {
    return fetch(`${this._address}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    }).then(response => this._getResponse(response));
  }

  changeAvatar(data) {
    return fetch(`${this._address}/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.urlAvatar
      })
    }).then(response => this._getResponse(response));
  }
}

