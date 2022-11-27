export class Card {
    constructor(data, elementTempale) {
        this._name = data.name;
        this._link = data.link;
        this._elementTempale = elementTempale;
    }

    _getCardTemplate() {
        this._cardTemplate = this._elementTempale
        .querySelector('.element')
        .cloneNode(true)
    }

    renderCard() {
        this._getCardTemplate();
        this._setEventListener();
        this._cardImage = this._cardTemplate.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._title = this._cardTemplate.querySelector('.element__title');
        this._title.textContent = this._name;
        return this._cardTemplate
    }

    _setEventListener() {
        this._cardTemplate.querySelector('.element__like-button')
        .addEventListener('click', () => {
            this._cardTemplate.querySelector('.element__like-button')
            .classList.toggle('element__like-button_active');
        });

        this._cardTemplate.querySelector('.element__trash')
        .addEventListener('click', () => {
            this._cardTemplate.remove();
        });
    }
}
