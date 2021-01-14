import Card from './Card.js'
import { validateConfigPopup } from './consts.js';
import FormValidator from './FormValidator.js';

// формы
const editForm = document.querySelector('.popup_type_edit-profile');
const formAddCard = document.querySelector('.popup_type_add-card');
const popupOpenPhoto = document.querySelector('.popup_type_open-photo');
const formEditValidate = document.querySelector('.popup__item_type_edit-popup');
const formAddCardValidate = document.querySelector('.popup__item_type_add-card');

// кнопки открытия
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// кнопки закрытия
const closeButton = editForm.querySelector('.popup__close-button');
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

const popupDescription = document.querySelector('.popup__description');
const openBigPhoto = document.querySelector('.popup__big-photo');
const submitButtonAddCard = document.querySelector('.popup__submit-button_type_add-form');

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

const handleCardClick = (name, link) => {
  openBigPhoto.src = link;
  openBigPhoto.alt = name;
  popupDescription.textContent = name;

  openPopup(popupOpenPhoto);
}

// функция открытия формы
const openPopup = form => {
  form.addEventListener('click', closePopupClickOverlay);
  document.addEventListener('keydown', closePopupKeydownEsc);
  form.classList.add('popup_opened');
}

// функция закрытия формы
const closePopup = form => {
  form.removeEventListener('click', closePopupClickOverlay);
  document.removeEventListener('keydown', closePopupKeydownEsc);
  form.classList.remove('popup_opened');
  if (!form.classList.contains('popup_type_open-photo')) {
    form.querySelector('.popup__items').reset();
  }
}

// открытие формы редактирования
editButton.addEventListener('click', () => {
  openPopup(editForm)
  clearError();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closeButton.addEventListener('click', () => closePopup(editForm));
addCardButton.addEventListener('click', () => {
  disabledSubmitButton(submitButtonAddCard);
  openPopup(formAddCard);
  clearError();
});

closeButtonAddForm.addEventListener('click', () => closePopup(formAddCard));
closeButtonOpenPhoto.addEventListener('click', () => closePopup(popupOpenPhoto));

// Обработчик формы редактирования
editForm.addEventListener('submit', evt => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editForm);
});

// функция закрытия при клике оверлей
function closePopupClickOverlay(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(activePopup);
  }
}

// функция закрытия при нажатии клавиши ESC
function closePopupKeydownEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
   }
}

// функция добавления карточки
const addCard = (cardElement, container, isPrepend) => {
  isPrepend === true ? container.prepend(cardElement) : container.append(cardElement);
}

function createCard(item) {
  const card = new Card(item, '.template-elements', handleCardClick);
  const cardElement = card.createNewCard();
  return cardElement;
}

// рендер массива карточек
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  addCard(cardElement, cardGrid);
});


// обработчк формы добавления фотографии
const handlerFormAddCard = evt => {
  evt.preventDefault();

  const newCard = {name: nameAddCard.value, link: urlAddCard.value}

  const cardElement = createCard(newCard);

  addCard(cardElement, cardGrid, true);
  closePopup(formAddCard);
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
