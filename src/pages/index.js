import Card from '../components/Card.js'
import { validateConfigPopup, initialCards } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const formEditValidate = document.querySelector('.popup__items_type_edit-popup');
const formAddCardValidate = document.querySelector('.popup__items_type_add-card');
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');

// класс открытия карточек
const popupWithImage = new PopupWithImage('.popup_type_open-photo');

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

popupWithImage.setEventListeners();

// рендер начальных карточек
const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    initialCardList.addItem(cardElement, false);
  }
}, '.elements__grid');

initialCardList.renderItems();

//класс собирающий и отдающий информацию о пользователе
const userInfo = new UserInfo({
  selectorProfileName: '.profile__title',
  selectorProfileDescription: '.profile__subtitle'
});

// класс формы редактирования
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.firstname, info: data.job });
  }
})

popupEditProfile.setEventListeners();

// класс создания новых карточек
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
  handleFormSubmit: (data) => {
    const newCard = { name: data.titleCard, link: data.urlCard }
    const cardElement = createCard(newCard);
    initialCardList.addItem(cardElement, true);
  }
})

addCardPopup.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.template-elements', handleCardClick);
  const cardElement = card.createNewCard();
  return cardElement;
}

// слушатель кнопки формы редактирования
editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfile.open();
  formEdit.clearErrors();
  formEdit.activateSubmitButton();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.info;
});

// слушатель кнопки добавления карточки
addCardButton.addEventListener('click', () => {
  formAddCardValid.clearErrors();
  formAddCardValid.disabledSubmitButton();
  addCardPopup.open();
});

// валидация форм
const formEdit = new FormValidator(validateConfigPopup, formEditValidate);
const formAddCardValid = new FormValidator(validateConfigPopup, formAddCardValidate);
formEdit.enableValidation();
formAddCardValid.enableValidation();



