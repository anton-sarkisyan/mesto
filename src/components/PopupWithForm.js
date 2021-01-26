import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._elementForm = this._popup.querySelector('.popup__items');
    this._handleFormSubmit = handleFormSubmit;
    this._popupInputList = this._elementForm.querySelectorAll('.popup__text');
  }

  _getInputValues() {
    this._formValues = {};
    this._popupInputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._elementForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._elementForm.reset();
  }
}
