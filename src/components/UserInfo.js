export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription }) {
    this._selectorProfileName = document.querySelector(selectorProfileName);
    this._selectorProfileDescription = document.querySelector(selectorProfileDescription);
  }

  getUserInfo() {
    return {
      name: this._selectorProfileName.textContent,
      info: this._selectorProfileDescription.textContent
    }
  }

  setUserInfo({ name, info }) {
    this._selectorProfileName.textContent = name;
    this._selectorProfileDescription.textContent = info;
  }
}
