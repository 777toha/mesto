const modalEditOpen = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close");
const popupContent = document.querySelector(".popup__container");
const nameOut = document.querySelector(".profile__title");
const jobOut = document.querySelector(".profile__subtitle");
const popupForm = document.querySelector(".popup__form");
const nameInput = popupForm.querySelector(".popup__input_data_name");
const jobInput = popupForm.querySelector(".popup__input_data_profession");
const elementsContainer = document.querySelector(".elements"); // куда подставлять карточки
const elementTempale = document.querySelector("#element-template").content;
const elementContainerTemplate = elementTempale.querySelector('.element__container');
const popupOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_card-add");
const popupCloseAddCard = popupAddCard.querySelector(".popup__close");
const modalContentAddCard = popupAddCard.querySelector(".popup__container");
const popupZoomImage = document.querySelector('.popup_zoom-image');
const popupZoomButtonClose = popupZoomImage.querySelector('.popup__close');
const popupZoomFigure = popupZoomImage.querySelector('.popup__figure');
const elementCard = elementTempale.querySelector(".element");
const placeNameAddCard = popupAddCard.querySelector('.popup__input_data_name');
const placeUrlAddCard = popupAddCard.querySelector('.popup__input_data_profession');
const popupElementImage = popupZoomImage.querySelector('.popup__image');
const formSubmitAddCard = popupAddCard.querySelector(".popup__form");
const popupElementCaption = popupZoomImage.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: "Челябинская область",
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openGeneralPopup(popup) {
    popup.classList.add("popup_opened");
};

function closeGeneralPopup(popup) {
    popup.classList.remove("popup_opened");
};

nameInput.value = nameOut.textContent;
jobInput.value = jobOut.textContent;

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    nameOut.textContent = nameInput.value
    jobOut.textContent = jobInput.value
    closeGeneralPopup(popupProfile);
};

// project 2

function deleteCard (e) {
  e.target.closest('.element').remove();
};

function toggleLikeCard(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

const addElement = (initialCards) => {
    const elementCard = elementTempale.cloneNode(true);
    const elementImage = elementCard.querySelector(".element__image");
    const elementTitle = elementCard.querySelector(".element__title");

    elementTitle.textContent = initialCards.name;
    elementImage.src = initialCards.link;
    elementImage.alt = initialCards.name;

    const elementButtonLike = elementCard.querySelector('.element__like-button');
    elementButtonLike.addEventListener('click',toggleLikeCard);

    const elementButtonDelete = elementCard.querySelector('.element__trash');
    elementButtonDelete.addEventListener('click', deleteCard);

    elementImage.addEventListener('click', function () {
      popupElementImage.src = initialCards.link;
      popupElementImage.alt = initialCards.name;
    
      popupElementCaption.textContent = initialCards.name;
    
      openGeneralPopup(popupZoomImage);
    });
    return elementCard;
  };

// добавление карточек
function addNewElement(evt) {
    evt.preventDefault();

    const newPlaceName = placeNameAddCard.value;
    const newPlaceUrl = placeUrlAddCard.value;

    const newAddElement = addElement({name: newPlaceName, link: newPlaceUrl});

    elementsContainer.prepend(newAddElement); 

    placeNameAddCard.value = '';
    placeUrlAddCard.value = '';
    closeGeneralPopup(popupAddCard);
};

modalEditOpen.addEventListener('click',() => openGeneralPopup(popupProfile));
popupCloseBtnProfile.addEventListener('click', () => closeGeneralPopup(popupProfile));
popupForm.addEventListener('submit', handleProfileFormSubmit);
formSubmitAddCard.addEventListener('submit', addNewElement);
popupOpenAddCard.addEventListener('click', () => openGeneralPopup(popupAddCard));
popupCloseAddCard.addEventListener('click', () => closeGeneralPopup(popupAddCard));
popupElementImage.addEventListener('click', () => openGeneralPopup(popupZoomImage));
popupZoomButtonClose.addEventListener('click', () => closeGeneralPopup(popupZoomImage));
initialCards.forEach((elementCard) => {
  elementsContainer.append(addElement(elementCard));
});

