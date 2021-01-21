export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._spanError = this._form.querySelectorAll(this._config.spanError);
  }

  _showError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };

  _hideError = (input) => {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  };

  _checkInputValidity = (input) => {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    };
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disabledSubmitButton();
    } else {
      this.activateSubmitButton();
    }
  }

  _setEventListener = () => {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  };

  enableValidation = () => {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListener();
  };

  clearErrors = () => {
    this._inputList.forEach((inputError) => {
      inputError.classList.remove(this._config.inputErrorClass);
    });

    this._spanError.forEach(span => {
      span.textContent = '';
    });
    this._form.reset();
  };

  disabledSubmitButton = () => {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  activateSubmitButton = () => {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };
}


