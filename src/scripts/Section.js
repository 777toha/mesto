export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._containerSelector = document.querySelector(containerSelector);
        this._renderer = renderer;
        this._items = items;
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    } 
}