import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {options, initialCards} from '../constants/constants.js';

const modalEditOpen = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close");
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
const formSubmitProfile = popupProfile.querySelector('.popup__form');
const popupElementCaption = popupZoomImage.querySelector('.popup__caption');
const popupSaveButton = popupAddCard.querySelector('.popup__save');

const profileFormValidator = new FormValidator(options, formSubmitProfile);
const cardAddFormValidator = new FormValidator(options, formSubmitAddCard);

profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

const handleEscKeyDown = (e) => {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closeGeneralPopup(openedPopup);
  }
};

function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closeGeneralPopup(evt.target);
    }
};

function openGeneralPopup(popup) {
    popup.classList.add("popup_opened");

    popup.addEventListener('mousedown', handleOverlayClose);

    document.addEventListener('keydown', handleEscKeyDown);
};

function closeGeneralPopup(popup) {
    popup.classList.remove("popup_opened");

    popup.removeEventListener('mousedown', handleOverlayClose);

    document.removeEventListener('keydown', handleEscKeyDown);
};

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    nameOut.textContent = nameInput.value
    jobOut.textContent = jobInput.value
    closeGeneralPopup(popupProfile);
};

// project 2
function openZoomImg(сardLink, сardName) {
  popupElementImage.src = сardLink;
  popupElementImage.alt = сardName;

  popupElementCaption.textContent = сardName;

  openGeneralPopup(popupZoomImage);
};

const addElement = (elementCard) => {
  const card = new Card(elementCard, '#element-template', openZoomImg);
  const cardElement = card.renderCard();
  // не понимаю где вызвать resetValidation
  return cardElement;
  };

initialCards.forEach((elementCard) => {
  elementsContainer.append(addElement(elementCard));
});

function addNewElement(evt) {
    evt.preventDefault();

    const newAddElement = addElement({
      name: placeNameAddCard.value,
      link: placeUrlAddCard.value
    });

    elementsContainer.prepend(newAddElement); 

    evt.target.reset();
    closeGeneralPopup(popupAddCard);
};

function addTextProfile() { 
  nameInput.value = nameOut.textContent;
  jobInput.value = jobOut.textContent;
  }

modalEditOpen.addEventListener('click',() => {
  addTextProfile();
  openGeneralPopup(popupProfile);
  profileFormValidator.resetValidation();
});
popupCloseBtnProfile.addEventListener('click', () => closeGeneralPopup(popupProfile));
popupForm.addEventListener('submit', handleProfileFormSubmit);
formSubmitAddCard.addEventListener('submit', addNewElement);
popupOpenAddCard.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  openGeneralPopup(popupAddCard);
});
popupCloseAddCard.addEventListener('click', () => closeGeneralPopup(popupAddCard));
popupElementImage.addEventListener('click', () => openGeneralPopup(popupZoomImage));
popupZoomButtonClose.addEventListener('click', () => closeGeneralPopup(popupZoomImage));

