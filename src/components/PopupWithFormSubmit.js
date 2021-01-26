import Popup from '../components/Popup.js'

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementForm = this._popup.querySelector('.popup__items');
  }
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this._elementForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();
    })
    super.setEventListeners();
  }
}

