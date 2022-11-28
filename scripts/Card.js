export class Card {
    constructor(data, elementTempale, openZoomImg) {
        this._name = data.name;
        this._link = data.link;
        this._elementTempale = elementTempale;
        this._openZoomImg = openZoomImg;
    }

    _getCardTemplate() {
        this._cardTemplate = document
        .querySelector(this._elementTempale)
        .content
        .querySelector('.element')
        .cloneNode(true)
    }

    renderCard() {
        this._getCardTemplate();
        this._cardImage = this._cardTemplate.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._title = this._cardTemplate.querySelector('.element__title');
        this._title.textContent = this._name;
        this._buttonLike = this._cardTemplate.querySelector('.element__like-button');
        this._buttonTrash = this._cardTemplate.querySelector('.element__trash');

        this._setEventListener();

        return this._cardTemplate
    }

    _clickLike() {
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _clickTrash() {
        this._cardTemplate.remove();
    }

    _setEventListener() {
        this._buttonLike.addEventListener('click', () => {
            this._clickLike();
        });

        this._buttonTrash.addEventListener('click', () => {
            this._clickTrash();
        });
        this._cardImage.addEventListener('click', () => {
            this._openZoomImg(this._link, this._name);
        });
    }
}
