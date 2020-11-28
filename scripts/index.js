// формы
const editForm = document.querySelector('.popup');
const formAddCard = document.querySelector('.popup_type_add-card');
const popupOpenPhoto = document.querySelector('.popup_type_open-photo');


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
const photoCardTitle = document.querySelector('.element__title');


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

const cardGrid = document.querySelector('.elements__grid');

// функция создания карточки карточки
const createCard = (cardElement) => {
  const templateCard = document.querySelector('.template-elements').content.cloneNode(true);
  const cardTitle = templateCard.querySelector('.element__title');
  const cardImage = templateCard.querySelector('.element__photo');

  cardTitle.textContent = cardElement.name;
  cardImage.setAttribute('src', cardElement.link);
  cardImage.setAttribute('alt', cardElement.name);

  //обработчик лайка
  const cardButtonLike = templateCard.querySelector('.element__button');
  cardButtonLike.addEventListener('click', evt => {
    const like = evt.target;
    like.classList.toggle('element__button_active');
  })

  //удаление карточки
  const cardButtonDelete = templateCard.querySelector('.element__button_type_delete');
  cardButtonDelete.addEventListener('click', evt => {
    evt.target.closest('.element').remove();
  });

  // открытие фотографии карточки
  cardImage.addEventListener('click', evt => {
    const openPhoto = evt.target;
    const popupDescription = document.querySelector('.popup__description');
    const openBigPhoto = document.querySelector('.popup__big-photo');

    openBigPhoto.src = openPhoto.src;
    openBigPhoto.alt = openPhoto.alt;
    popupDescription.textContent = cardElement.name;

    openedForm(popupOpenPhoto);
  });

  return templateCard;
}

// функция добавления карточки
const addCard = (cardElement, container, isPrepend) => {
  isPrepend === true ? container.prepend(cardElement) : container.append(cardElement);
}

// добавление карточек массива
initialCards.forEach((item) => addCard(createCard(item), cardGrid));

// обработчк формы добавления фотографии
const handlerFormAddCard = evt => {
  evt.preventDefault();

  const newCard = {name: nameAddCard.value, link: urlAddCard.value}

  addCard(createCard(newCard), cardGrid, true);
  closeForm(formAddCard);
}

formAddCard.addEventListener('submit', handlerFormAddCard);

// функция открытия формы
const openedForm = form => {
  form.addEventListener('click', closePopupClickOverlay);
  form.addEventListener('keydown', closePopupKeydownEsc);
  form.classList.add('popup_opened');
}

// функция закрытия формы
const closeForm = form => {
  form.removeEventListener('click', closePopupClickOverlay);
  form.removeEventListener('keydown', closePopupKeydownEsc);
  form.classList.remove('popup_opened');
  clearError();
  form.querySelector('.popup__items').reset();
}


// открытие формы редактирования
editButton.addEventListener('click', () => {
  openedForm(editForm)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

closeButton.addEventListener('click', () => closeForm(editForm));
addCardButton.addEventListener('click', () => {
  const submitButtonAddForm = document.querySelector('.popup__submit-button_type_add-form');
  submitButtonAddForm.classList.add('popup__submit-button_inactive');
  openedForm(formAddCard)
});
closeButtonAddForm.addEventListener('click', () => {closeForm(formAddCard)});
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
  if (evt.keyCode === 27) {
    closeForm(activePopup);
   }
}

