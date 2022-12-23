export class Card {
    constructor(data, elementTempale, openZoomImg, userId, api, {handleConfirmDelete, }) {
        this._name = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._elementTempale = elementTempale;
        this._openZoomImg = openZoomImg;
        this._userId = userId;
        this._api = api;
        this._id = data._id
        this._likes = data.likes

        this._handleConfirmDelete = handleConfirmDelete;
        // this._handleLikeClick = handleLikeClick;
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
        this._likeCounter = this._cardTemplate.querySelector('.element__counter-like');
        this._buttonTrash = this._cardTemplate.querySelector('.element__trash');

        if(this._ownerId !== this._userId) {
            this._buttonTrash.style.display = 'none';
        }

        if(this._likes.some(like => like._id === this._userId)) {
            this._buttonLike.classList.add('element__like-button_active');
        }
        this._likeCounter.textContent = this._likes.length;

        this._setEventListener();

        return this._cardTemplate
    }

    // _clickLike() {
    //     this._buttonLike.classList.toggle('element__like-button_active');
    // }

    clickTrash() {
        this._cardTemplate.remove();
    }

    _setEventListener() {
        this._buttonLike.addEventListener('click', () => {
            // this._clickLike();
            this._handleLikeClick();
        });

        this._buttonTrash.addEventListener('click', () => {
            this._handleConfirmDelete();
        });

        this._cardImage.addEventListener('click', () => {
            this._openZoomImg(this._link, this._name);
        });
    }

    _handleLikeClick() {
        if(!(this._buttonLike.classList.contains('element__like-button_active'))) {
            this._clickLikePut();
        } else {
            this._clickLikeDelete();
        }
    
    }

    _clickLikePut() {
        this._api.getLikes(this._id).then((data) => {
            this._buttonLike.classList.add('element__like-button_active');
            this._likeCounter.textContent = data.likes.length;
        })
    }

    _clickLikeDelete() {
        this._api.deleteLikes(this._id).then((data) => {
            this._buttonLike.classList.remove('element__like-button_active');
            this._likeCounter.textContent = data.likes.length;
        })
    }

}
