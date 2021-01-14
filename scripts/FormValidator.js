export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
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

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this.disabledSubmitButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListener = () => {
    const _inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const _buttonElement = this._form.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(_inputList, _buttonElement);

    _inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(_inputList, _buttonElement);
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
    const _typeError = this._form.querySelectorAll(`.${this._config.inputErrorClass}`);
    const _spanError = this._form.querySelectorAll(this._config.spanError);

    _typeError.forEach((inputError) => {
      inputError.classList.remove(this._config.inputErrorClass);
      });

    _spanError.forEach(span => {
      span.textContent = '';
    });
    }

  disabledSubmitButton = (buttonElement) => {
    buttonElement.classList.add(this._config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };
}


