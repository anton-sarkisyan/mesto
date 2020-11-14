const editForm = document.querySelector('.edit-form');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.edit-form__close-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.edit-form__text_type_name');
let jobInput = document.querySelector('.edit-form__text_type_job');

function openedForm() {
  if (editForm.classList.contains('edit-form_opened') === false) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    editForm.classList.toggle('edit-form_opened');
  } else {
    editForm.classList.toggle('edit-form_opened');
  }
}

editButton.addEventListener('click', openedForm);
closeButton.addEventListener('click', openedForm);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  editForm.classList.toggle('edit-form_opened');
}

editForm.addEventListener('submit', formSubmitHandler);

