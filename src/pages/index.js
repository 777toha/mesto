import "./index.css";
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';
import {options, initialCards} from '../constants/constants.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

const modalEditOpen = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupCloseBtnProfile = popupProfile.querySelector(".popup__close");
const nameOut = document.querySelector(".profile__title");
const jobOut = document.querySelector(".profile__subtitle");
const popupForm = document.querySelector(".popup__form");
const nameInput = popupProfile.querySelector(".popup__input_data_name");
const jobInput = popupProfile.querySelector(".popup__input_data_profession");
const elementsContainer = document.querySelector(".elements");
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

// const handleEscKeyDown = (e) => {
//   if (e.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closeGeneralPopup(openedPopup);
//   }
// };

// function handleOverlayClose(evt) {
//   if (evt.target.classList.contains('popup')) {
//     closeGeneralPopup(evt.target);
//     }
// };

// function openGeneralPopup(popup) {
//     popup.classList.add("popup_opened");

//     popup.addEventListener('mousedown', handleOverlayClose);

//     document.addEventListener('keydown', handleEscKeyDown);
// };

// function closeGeneralPopup(popup) {
//     popup.classList.remove("popup_opened");

//     popup.removeEventListener('mousedown', handleOverlayClose);

//     document.removeEventListener('keydown', handleEscKeyDown);
// };

// project 2

const popupWithImage = new PopupWithImage('.popup_zoom-image');
popupWithImage.setEventListeners();

const openZoomImg = (сardLink, сardName) => {
  popupWithImage.open(сardLink, сardName);
};

const createCard = (elementCard) => {
  const card = new Card(elementCard, '#element-template', openZoomImg);
  const cardElement = card.renderCard();
  return cardElement;
  };

const createSectionElement = new Section({
  items: initialCards,
  renderer: (elementCard) => {
    createSectionElement.addItem(createCard(elementCard));
  }
}, '.elements');

createSectionElement.renderItems();

const popupCardWithForm = new PopupWithForm('.popup_card-add', 
{handleFormSubmit: (formValue) => {
  createSectionElement.addItem(createCard({
    link: formValue.url,
    name: formValue.name
  }));
  popupCardWithForm.close();
}});
popupCardWithForm.setEventListeners();

const userInfo = new UserInfo({name: ".profile__title", job: ".profile__subtitle"});

const popupProfileWithForm = new PopupWithForm('.popup_profile', 
{handleFormSubmit: (formValue) => {
  userInfo.setUserInfo({
    nameValue: formValue.name,
    jobValue: formValue.job
  });
  popupProfileWithForm.close();
}});
popupProfileWithForm.setEventListeners();

function addTextProfile() { 
  const formValue = userInfo.getUserInfo();
  nameInput.value = formValue.nameValue;
  jobInput.value = formValue.jobValue;
  popupProfileWithForm.open();
  };

// function handleProfileFormSubmit (evt) {
//     evt.preventDefault();
//     nameOut.textContent = nameInput.value
//     jobOut.textContent = jobInput.value
//     closeGeneralPopup(popupProfile);
// };

// function addNewElement(evt) {
//     evt.preventDefault();

//     const newAddElement = addElement({
//       name: placeNameAddCard.value,
//       link: placeUrlAddCard.value
//     });

//     elementsContainer.prepend(newAddElement); 

//     evt.target.reset();
//     closeGeneralPopup(popupAddCard);
// };

modalEditOpen.addEventListener('click',() => {
  addTextProfile();
  profileFormValidator.resetValidation();
});
// popupCloseBtnProfile.addEventListener('click', () => closeGeneralPopup(popupProfile));
// popupForm.addEventListener('submit', handleProfileFormSubmit);
popupOpenAddCard.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  popupCardWithForm.open();
});
// formSubmitAddCard.addEventListener('submit', addNewElement);
// popupCloseAddCard.addEventListener('click', () => closeGeneralPopup(popupAddCard));
// popupElementImage.addEventListener('click', () => openGeneralPopup(popupZoomImage));
// popupZoomButtonClose.addEventListener('click', () => closeGeneralPopup(popupZoomImage));

