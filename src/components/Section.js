export default class Section {
    constructor({renderer}, containerSelector) {
        this._containerSelector = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    renderItems(cards) {
        cards.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    } 
}