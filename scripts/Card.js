import { openedForm, popupOpenPhoto, popupDescription, openBigPhoto } from './index.js'

export default class CreateCard {
  constructor(cardElement, cardSelector) {
    this._name = cardElement.name;
    this._image = cardElement.link;
    this._cardSelector = cardSelector;
  }

  _getTemplateCard = () => {
    const templateCard = document.querySelector(this._cardSelector).content.cloneNode(true);

    return templateCard;
  }

  createNewCard = () => {
    this._templateCard = this._getTemplateCard();
    this._setEventListener();
    const _cardTitle = this._templateCard.querySelector('.element__title');
    const _cardImage = this._templateCard.querySelector('.element__photo');

    _cardTitle.textContent = this._name;
    _cardImage.setAttribute('src', this._image);
    _cardImage.setAttribute('alt', this._image);

    return this._templateCard;
  }

  _setEventListener = () => {
    const _cardButtonLike = this._templateCard.querySelector('.element__button');
    const _cardButtonDelete = this._templateCard.querySelector('.element__button_type_delete');
    const _cardOpenPhoto = this._templateCard.querySelector('.element__photo');

    _cardButtonLike.addEventListener('click', evt => {
      evt.target.classList.toggle('element__button_active');
    });

    _cardButtonDelete.addEventListener('click', evt => {
      evt.target.closest('.element').remove();
    });

    _cardOpenPhoto.addEventListener('click', evt => {
      const openPhoto = evt.target;

      openBigPhoto.src = openPhoto.src;
      openBigPhoto.alt = openPhoto.alt;
      popupDescription.textContent = this._name;

      openedForm(popupOpenPhoto);
    });
  }
}

