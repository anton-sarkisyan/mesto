export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer;
    this._selectorContainer = document.querySelector(selectorContainer);
  }

  renderItems(cardList) {
    cardList.forEach(item => this._renderer(item));
  }

  addItem(element, isPrepend) {
    isPrepend === true ? this._selectorContainer.prepend(element) : this._selectorContainer.append(element);
  }
}
