let editForm = document.querySelector('.edit-form');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.edit-form__close-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.edit-form__text_type_name');
let jobInput = document.querySelector('.edit-form__text_type_job');


const initialCards = [
  {
      name: 'Исландия',
      link: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1127&q=80'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
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

function addCard(cardElement) {
  const templateCard = document.querySelector('.template-elements').content.cloneNode(true);
  templateCard.querySelector('.element__title').textContent = cardElement.name;
  templateCard.querySelector('.element__photo').setAttribute('src', cardElement.link);

  cardGrid.append(templateCard);
}

initialCards.forEach(addCard);






function openedForm() {
  if (editForm.classList.contains('edit-form_opened') === false) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  editForm.classList.toggle('edit-form_opened');
}

editButton.addEventListener('click', openedForm);
closeButton.addEventListener('click', openedForm);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  openedForm();
}

editForm.addEventListener('submit', formSubmitHandler);

