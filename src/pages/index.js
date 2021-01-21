import Card from '../components/Card.js'
import {
  validateConfigPopup, initialCards, formEditValidate, formAddCardValidate,
  editButton, addCardButton, nameInput, jobInput
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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
    const initialCard = new Card(item, '.template-elements', handleCardClick);
    const cardElement = initialCard.createNewCard();
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
    const card = new Card(newCard, '.template-elements', handleCardClick);
    const cardElement = card.createNewCard();
    initialCardList.addItem(cardElement, true);
  }
})

addCardPopup.setEventListeners();

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



