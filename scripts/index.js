import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {options, initialCards} from '../constants/constants.js';

const popupAll = document.querySelector(".popup");
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
    const openPopupWindowe = document.querySelector('.popup_opened');
    closeGeneralPopup(openPopupWindowe);
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

    popup.addEventListener('mousedown', handleOverlayClose);

    document.removeEventListener('keydown', handleEscKeyDown);
};

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

const addElement = (elementCard) => {
  const card = new Card(elementCard, elementTempale);
  const cardElement = card.renderCard();

  return cardElement;
  };

initialCards.forEach((elementCard) => {
  elementsContainer.append(addElement(elementCard));
});

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

function addTextProfile() { 
  nameInput.value = nameOut.textContent;
  jobInput.value = jobOut.textContent;
  // openGeneralPopup(popup)
  }

modalEditOpen.addEventListener('click',() => {
  addTextProfile();
  openGeneralPopup(popupProfile);
});
popupCloseBtnProfile.addEventListener('click', () => closeGeneralPopup(popupProfile));
popupForm.addEventListener('submit', handleProfileFormSubmit);
formSubmitAddCard.addEventListener('submit', addNewElement);
popupOpenAddCard.addEventListener('click', () => {
  popupSaveButton.classList.add('popup__save_disable');
  popupSaveButton.disabled = true;
  openGeneralPopup(popupAddCard);
});
popupCloseAddCard.addEventListener('click', () => closeGeneralPopup(popupAddCard));
popupElementImage.addEventListener('click', () => openGeneralPopup(popupZoomImage));
popupZoomButtonClose.addEventListener('click', () => closeGeneralPopup(popupZoomImage));

