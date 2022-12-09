import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(сardLink, сardName) {
        this._popupImage.src = сardLink;
        this._popupImage.alt = сardName;
      
        this._popupCaption.textContent = сardName;
      
        super.open();
    }
}