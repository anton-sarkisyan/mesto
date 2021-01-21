export const validateConfigPopup = {
  formSelector: '.popup__item',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  spanError: '.popup__error',
}

export const formEditValidate = document.querySelector('.popup__items_type_edit-popup');
export const formAddCardValidate = document.querySelector('.popup__items_type_add-card');
export const editButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const nameInput = document.querySelector('.popup__text_type_name');
export const jobInput = document.querySelector('.popup__text_type_job');

export const initialCards = [
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

