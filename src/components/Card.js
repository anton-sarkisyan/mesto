export default class Card {
  constructor({ data, cardSelector, handleCardClick, handlerDeletCard, idUser, addLike, deleteLike }) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlerDeletCard = handlerDeletCard;
    this._idCardOwner = data.owner._id;
    this._id = idUser;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
  }

  _getTemplateCard() {
    const templateCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return templateCard;
  }

  removeCard() {
    this._templateCard.remove();

    this._templateCard = null;
  }

  createNewCard() {
    this._templateCard = this._getTemplateCard();
    this._cardButtonLike = this._templateCard.querySelector('.element__button');
    this._cardTitle = this._templateCard.querySelector('.element__title');
    this._cardImage = this._templateCard.querySelector('.element__photo');
    this._likesImage = this._templateCard.querySelector('.element__count-like');
    this._buttonCardDelete = this._templateCard.querySelector('.element__button_type_delete');
    this._cardButtonDelete = this._templateCard.querySelector('.element__button_type_delete');
    this._cardOpenPhoto = this._templateCard.querySelector('.element__photo');

    this._likesImage.textContent = this._likes.length;
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._image;
    this._setEventListener();
    this._checkIdLikes(this._likes);


    if (this._idCardOwner !== this._id) {
      this._buttonCardDelete.remove();
    }
    return this._templateCard;
  }

  getId() {
    return this._idCard;
  }

  updateLike(data) {
    this._likesImage.textContent = data.likes.length;
  }

  _setLike() {
    this._cardButtonLike.classList.add('element__button_active');
    this._addLike();
  }

  _removeLike() {
    this._cardButtonLike.classList.remove('element__button_active');
    this._deleteLike();
  }

  _checkIdLikes(likes) {
    likes.forEach(arrayUser => {
      if (arrayUser._id === this._id) {
        this._cardButtonLike.classList.add('element__button_active');
      }
    })
  }

  _setEventListener() {
    this._cardButtonLike.addEventListener('click', this._handlerLikeButton.bind(this));
    this._cardButtonDelete.addEventListener('click', this._handlerDeletCard.bind(this));
    this._cardOpenPhoto.addEventListener('click', this._handlerOpenPhoto.bind(this));
  }

  _handlerLikeButton() {
    if (this._cardButtonLike.classList.contains('element__button_active')) {
      this._removeLike();
    } else {
      this._setLike()
    }
  }

  _handlerOpenPhoto() {
    this._handleCardClick(this._name, this._image)
  }
}

