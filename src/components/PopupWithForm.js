import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupButton = this._popupElement.querySelector('.popup__save');
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value
        });
        return formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._popupForm.reset();
    }

    loading(isLoading) {
        if(isLoading) {
            this._popupButton.textContent = 'Сохранение...'
        } else {
            this._popupButton.textContent = 'Сохранить'
        }
    }
}