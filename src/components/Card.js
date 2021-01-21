export default class Card {
  constructor(cardElement, cardSelector, handleCardClick) {
    this._name = cardElement.name;
    this._image = cardElement.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    _cardButtonLike.addEventListener('click', this._handlerButtonLike.bind(this));

    _cardButtonDelete.addEventListener('click', this._handlerButtonDelete.bind(this));

    _cardOpenPhoto.addEventListener('click', this._handlerOpenPhoto.bind(this));
  }

  _handlerButtonLike(evt) {
    evt.target.classList.toggle('element__button_active');
  }

  _handlerButtonDelete(evt) {
    evt.target.closest('.element').remove();
  }

  _handlerOpenPhoto() {
    this._handleCardClick(this._name, this._image)
  }
}

