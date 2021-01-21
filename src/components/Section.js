export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._initialCards = items;
    this._renderer = renderer;
    this._selectorContainer = document.querySelector(selectorContainer);
  }

  renderItems() {
    this._initialCards.forEach(item => this._renderer(item));
  }

  addItem(element, isPrepend) {
    isPrepend === true ? this._selectorContainer.prepend(element) : this._selectorContainer.append(element);
  }
}
