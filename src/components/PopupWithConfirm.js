import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._popupButton = this._popupForm.querySelectorAll('.popup__save');
    }

    setHandleSubmit(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleSubmit();
        })
    }
}