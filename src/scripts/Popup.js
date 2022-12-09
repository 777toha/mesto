export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open() {
        this._popupElement.classList.add("popup_opened");
        this._popupElement.addEventListener('mousedown', this._handleOverlayClose.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
        this._popupElement.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', () => {this.close()});
    }
}