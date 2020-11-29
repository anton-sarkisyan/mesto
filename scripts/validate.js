function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

function hideError (form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
};

function checkInputValidity (form, input, config) {
  if (!input.validity.valid) {
      showError(form, input, config);
  } else {
      hideError(form, input, config);
  };
};

function setEventListener (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(inputList, buttonElement, config);
    });
 });
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(form, config);
  });
};

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disabledSubmitButton(buttonElement, config);
 } else {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
  }
 }

 const disabledSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
 }

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
     return !input.validity.valid;
  });
};

const validateConfigPopup = {
  formSelector: '.popup__item',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
}

enableValidation(validateConfigPopup);

const clearError = () => {
  const typeError = document.querySelectorAll('.popup__text_type_error');
  const spanError = document.querySelectorAll('.popup__error');

  typeError.forEach((inputError) => {
    inputError.classList.remove('popup__text_type_error');
  });

  spanError.forEach(span => {
    span.textContent = '';
  });
}
