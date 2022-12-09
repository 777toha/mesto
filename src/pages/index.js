import "./index.css";
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {options, initialCards} from '../constants/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const modalEditOpen = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const nameInput = popupProfile.querySelector(".popup__input_data_name");
const jobInput = popupProfile.querySelector(".popup__input_data_profession");
const elementTempale = document.querySelector("#element-template").content;
const popupOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_card-add");
const popupZoomImage = document.querySelector('.popup_zoom-image');
const formSubmitAddCard = popupAddCard.querySelector(".popup__form");
const formSubmitProfile = popupProfile.querySelector('.popup__form');

const profileFormValidator = new FormValidator(options, formSubmitProfile);
const cardAddFormValidator = new FormValidator(options, formSubmitAddCard);

profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();

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

const cardElementSection = new Section({
  renderer: (elementCard) => {
    cardElementSection.addItem(createCard(elementCard));
  }
}, '.elements');

cardElementSection.renderItems(initialCards);

const popupCardWithForm = new PopupWithForm('.popup_card-add', 
{handleFormSubmit: (formValue) => {
  cardElementSection.addItem(createCard({
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

modalEditOpen.addEventListener('click',() => {
  addTextProfile();
  profileFormValidator.resetValidation();
});
popupOpenAddCard.addEventListener('click', () => {
  cardAddFormValidator.resetValidation();
  popupCardWithForm.open();
});
