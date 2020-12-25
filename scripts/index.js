import CreateCard from './Card.js'
import { validateConfigPopup } from './consts.js';
import FormValidator from './FormValidator.js';

// формы
const editForm = document.querySelector('.popup');
const formAddCard = document.querySelector('.popup_type_add-card');
export const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
const formEditValidate = document.querySelector('.popup__item_type_edit-popup');
const formAddCardValidate = document.querySelector('.popup__item_type_add-card');

// кнопки открытия
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// кнопки закрытия
const closeButton = document.querySelector('.popup__close-button');
const closeButtonAddForm = document.querySelector('.popup__close-button_type_add-form');
const closeButtonOpenPhoto = document.querySelector('.popup__close-button_type_open-photo');

// инпуты и тайтлы
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const nameAddCard = document.querySelector('.popup__text_type_title-card');
const urlAddCard = document.querySelector('.popup__text_type_url-card');
const cardGrid = document.querySelector('.elements__grid');

export const popupDescription = document.querySelector('.popup__description');
export const openBigPhoto = document.querySelector('.popup__big-photo');

const initialCards = [
  {
      name: 'Алтай',
      link: 'https://images.unsplash.com/photo-1589122758779-0df750e72d2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=884&q=80'
  },
  {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1580993123109-63aea48b2807?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
  },
  {
      name: 'Сочи',
      link: 'https://images.unsplash.com/photo-1501794046545-b5f71f5b047b?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
  },
  {
      name: 'Казань',
      link: 'https://images.unsplash.com/photo-1600421539016-cc3f0866d2b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция открытия формы
export const openedForm = form => {
  form.addEventListener('click', closePopupClickOverlay);
  document.addEventListener('keydown', closePopupKeydownEsc);
  form.classList.add('popup_opened');
}

// функция закрытия формы
const closeForm = form => {
  form.removeEventListener('click', closePopupClickOverlay);
  document.removeEventListener('keydown', closePopupKeydownEsc);
  form.classList.remove('popup_opened');
  clearError();
  if (!form.classList.contains('popup_type_open-photo')) {
    form.querySelector('.popup__items').reset();
  }
}

// открытие формы редактирования
editButton.addEventListener('click', () => {
  openedForm(editForm)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closeButton.addEventListener('click', () => closeForm(editForm));
addCardButton.addEventListener('click', () => {
  const submitButtonAddCard = document.querySelector('.popup__submit-button_type_add-form');

  disabledSubmitButton(submitButtonAddCard);
  openedForm(formAddCard);
});

closeButtonAddForm.addEventListener('click', () => closeForm(formAddCard));
closeButtonOpenPhoto.addEventListener('click', () => closeForm(popupOpenPhoto));

// Обработчик формы редактирования
editForm.addEventListener('submit', evt => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeForm(editForm);
});

// функция закрытия при клике оверлей
function closePopupClickOverlay(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closeForm(activePopup);
  }
}

// функция закрытия при нажатии клавиши ESC
function closePopupKeydownEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closeForm(activePopup);
   }
}

// функция добавления карточки
export const addCard = (cardElement, container, isPrepend) => {
  isPrepend === true ? container.prepend(cardElement) : container.append(cardElement);
}

// рендер массива карточек
initialCards.forEach((item) => {
  const card = new CreateCard(item, '.template-elements');

  const cardElement = card.createNewCard();
  addCard(cardElement, cardGrid);
});

// обработчк формы добавления фотографии
const handlerFormAddCard = evt => {
  evt.preventDefault();

  const newCard = {name: nameAddCard.value, link: urlAddCard.value}

  const card = new CreateCard(newCard, '.template-elements');
  const cardElement = card.createNewCard();

  addCard(cardElement, cardGrid, true);
  closeForm(formAddCard);
}

formAddCard.addEventListener('submit', handlerFormAddCard);

// валидация форм
const formEdit = new FormValidator(validateConfigPopup, formEditValidate);
const formAddCardValid = new FormValidator(validateConfigPopup, formAddCardValidate);
formEdit.enableValidation();
formAddCardValid.enableValidation();

// очистка форм от ошибок
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

const disabledSubmitButton = (buttonElement) => {
  buttonElement.classList.add(validateConfigPopup.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}
