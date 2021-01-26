import Card from '../components/Card.js'
import {
  validateConfigPopup, formChangeAvatarSelector, formEditProfileSelecor,
  formAddCardSelector, editButtonSelector, addCardButtonSelector, nameInputSelector,
  jobInputSelector, avatarUserSelector
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import Api from '../components/Api.js'
import PopupWithFormSubmit from '../components/PopupWithFormSubmit.js';
import renderLoadingData from '../utils/utils.js';

const formChangeAvatarImg = document.querySelector(formChangeAvatarSelector);
const formEditProfile = document.querySelector(formEditProfileSelecor);
const formAddCard = document.querySelector(formAddCardSelector);
const editButton = document.querySelector(editButtonSelector);
const addCardButton = document.querySelector(addCardButtonSelector);
const nameInput = document.querySelector(nameInputSelector);
const jobInput = document.querySelector(jobInputSelector);
const avatarUser = document.querySelector(avatarUserSelector);

const api = new Api({
  address: 'https://mesto.nomoreparties.co',
  token: '78cfcf12-b1ee-4c9f-922c-0fac77943b1b',
  cohortId: 'cohort-19'
})

Promise.all([api.getUserData(), api.getInitialCard()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    initialCardList.renderItems(cards);
  })
  .catch(err => console.log('Ошибка при получении данных пользователя и карточки'))

// класс открытия карточек
const popupWithImage = new PopupWithImage('.popup_type_open-photo');
popupWithImage.setEventListeners();

const popupWithFormSubmit = new PopupWithFormSubmit('.popup_type_delete-card');
popupWithFormSubmit.setEventListeners();

const popupChangeAvatar = new PopupWithForm(('.popup_type_avatar'), {
  handleFormSubmit: (data) => {
    renderLoadingData(formChangeAvatarImg, 'Сохранение...')
    api.changeAvatar(data)
      .then(result => {
        userInfo.setUserInfo(result);
        renderLoadingData(formChangeAvatarImg, 'Сохранить')
      })
      .catch(err => console.log('Ошибка при изменении аватара'))
  }
})
popupChangeAvatar.setEventListeners();

// рендер начальных карточек
const initialCardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    initialCardList.addItem(cardElement, false);
  }
}, '.elements__grid');

//класс собирающий и отдающий информацию о пользователе
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

// класс формы редактирования
const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleFormSubmit: (data) => {
    renderLoadingData(formEditProfile, 'Сохранение...')
    api.editUserData(data)
      .then(result => {
        userInfo.setUserInfo(result);
        renderLoadingData(formEditProfile, 'Сохранить')
      })
      .catch(err => console.log('Ошибка при редактировании профиля'))
  }
})
popupEditProfile.setEventListeners();

// класс создания новых карточек
const addCardPopup = new PopupWithForm('.popup_type_add-card', {
  handleFormSubmit: (data) => {
    renderLoadingData(formAddCard, 'Сохранение...')
    api.addNewCard(data)
      .then(result => {
        const cardElement = createCard(result);
        initialCardList.addItem(cardElement, true);
        renderLoadingData(formAddCard, 'Сохранить')
      })
      .catch(err => console.log('Ошибка при создании карточки'))
  }
})
addCardPopup.setEventListeners();

function createCard(item) {
  const card = new Card({
    data: item,
    cardSelector: '.template-elements',
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    handlerDeletCard: () => {
      popupWithFormSubmit.open();
      popupWithFormSubmit.setSubmitAction(() => {
        api.deleteCard(card.getId())
          .then(() => card.removeCard())
          .catch(err => console.log('Ошибка при удалении карточки'))
      })
    },
    idUser: userInfo.getUserInfo().id,
    addLike: () => {
      api.addLikeCard(card.getId())
        .then(data => card.updateLike(data))
        .catch(err => console.log('Ошибка при установке лайка'))
    },
    deleteLike: () => {
      api.deleteLikeCard(card.getId())
        .then(data => card.updateLike(data))
        .catch(err => console.log('Ошибка при удалении лайка'))
    }
  })
  return card.createNewCard();
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

avatarUser.addEventListener('click', () => {
  formAddCardValid.clearErrors();
  formAddCardValid.disabledSubmitButton();
  popupChangeAvatar.open();
});


// валидация форм
const formEdit = new FormValidator(validateConfigPopup, formEditProfile);
const formAddCardValid = new FormValidator(validateConfigPopup, formAddCard);
const formChangeAvatar = new FormValidator(validateConfigPopup, formChangeAvatarImg);
formEdit.enableValidation();
formAddCardValid.enableValidation();
formChangeAvatar.enableValidation();


