export default class UserInfo {
  constructor(selectorProfileName, selectorProfileDescription, avatar) {
    this._selectorProfileName = document.querySelector(selectorProfileName);
    this._selectorProfileDescription = document.querySelector(selectorProfileDescription);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._selectorProfileName.textContent,
      info: this._selectorProfileDescription.textContent,
      id: this._id,
      avatar: this._avatar
    }
  }

  setUserInfo(data) {
    this._selectorProfileName.textContent = data.name;
    this._selectorProfileDescription.textContent = data.about;
    this._id = data._id;
    this._avatar.src = data.avatar;
  }
}
