import "./index.css";
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {options, initialCards} from '../constants/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

const modalEditOpen = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const nameInput = popupProfile.querySelector(".popup__input_data_name");
const jobInput = popupProfile.querySelector(".popup__input_data_profession");
const popupOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_card-add");
const formSubmitAddCard = popupAddCard.querySelector(".popup__form");
const formSubmitProfile = popupProfile.querySelector('.popup__form');
const popupAvatarOpenButton = document.querySelector('.profile__avatar');
const popupAvatar = document.querySelector('.popup_avatar');
const formSubmitAvatar = popupAvatar.querySelector('.popup__form');
 
const profileFormValidator = new FormValidator(options, formSubmitProfile);
const cardAddFormValidator = new FormValidator(options, formSubmitAddCard);
const profileAvatarValidator = new FormValidator(options, formSubmitAvatar);

profileFormValidator.enableValidation();
cardAddFormValidator.enableValidation();
profileAvatarValidator.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: 'b539dedd-af29-48d2-8a46-3706330bf2bf',
    'Content-Type': 'application/json'
  }
})

const popupWithConfirm = new PopupWithConfirm('.popup_confirm-delete');
popupWithConfirm.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_zoom-image');
popupWithImage.setEventListeners();

const openZoomImg = (сardLink, сardName) => {
  popupWithImage.open(сardLink, сardName);
};

const createCard = (elementCard) => {
  const card = new Card(elementCard, '#element-template', openZoomImg, userId,
  {handleConfirmDelete: () => {
    popupWithConfirm.open();
    popupWithConfirm.setHandleSubmit(() => 
      api.deleteCard(elementCard._id).then(() => {
        card.clickTrash();
        popupWithConfirm.close();
        })
        .catch((err) => {
          console.log(err)})
      )
    },
    handleLikeClick: (likes) => {
      if(likes) {
        api.getLikes(elementCard._id).then((data) => {
          card.updateLikes(data)
        }).catch(err => {
          console.log(err);
        })
      } else {
        api.deleteLikes(elementCard._id).then((data) => {
          card.updateLikes(data)
        }).catch(err => {
          console.log(err);
        })
      }
    }
  });
  const cardElement = card.renderCard();
  return cardElement;
  };

const cardElementSection = new Section({
  renderer: (elementCard) => {
    cardElementSection.addItem(createCard(elementCard));
  }
}, '.elements');

// api.getCards().then((cards) => {
//   cardElementSection.renderItems(cards.reverse());
// })
// .catch((err) => {
//   console.log(err)});

const popupCardWithForm = new PopupWithForm('.popup_card-add', 
{handleFormSubmit: (data) => {
  popupCardWithForm.loading(true);
  api.postCards(data).then((data) => { 
  cardElementSection.addItem(createCard(data));
  popupCardWithForm.close();
  })
  .catch((err) => {
    console.log(err)})
  .finally(() => {
    popupCardWithForm.loading(false);
  });
}});
popupCardWithForm.setEventListeners();

const popupAvatarProfile = new PopupWithForm('.popup_avatar',
{
  handleFormSubmit: (data) => {
    popupAvatarProfile.open();
    popupAvatarProfile.loading(true);
    api.getUserAvatar(data)
    .then((data) => {
      userInfo.handleAvatarUser(data);
      popupAvatarProfile.close();
    })
    .catch((err) => {
      console.log(err)})
    .finally(() => {
      popupAvatarProfile.loading(false);
    });
  }
});
popupAvatarProfile.setEventListeners();

const userInfo = new UserInfo({name: ".profile__title", 
                              job: ".profile__subtitle",
                              avatar: ".profile__avatar"});

// api.getInfo().then((userData) => {
//   userInfo.setUserInfo({
//     nameValue: userData.name,
//     jobValue: userData.about,
//     avatar: userData.avatar
//     });
//   userId = userData._id;
// })
// .catch((err) => {
//   console.log(err)});

const popupProfileWithForm = new PopupWithForm('.popup_profile', 
{handleFormSubmit: (userData) => {
  popupProfileWithForm.loading(true);
  api.sendUserInfo(userData).then((userData) => {
    userInfo.setUserInfo({
      nameValue: userData.name,
      jobValue: userData.about,
      avatar: userData.avatar
    });
    popupProfileWithForm.close();
  })
  .catch((err) => {
    console.log(err)})
  .finally(() => {
    popupProfileWithForm.loading(false);
  });
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
popupAvatarOpenButton.addEventListener('click', () => {
  profileAvatarValidator.resetValidation();
  popupAvatarProfile.open();
})

let userId;

Promise.all([

  api.getInfo().then((userData) => {
  userInfo.setUserInfo({
    nameValue: userData.name,
    jobValue: userData.about,
    avatar: userData.avatar
    });
  userId = userData._id;
}),

  api.getCards().then((cards) => {
    cardElementSection.renderItems(cards.reverse());
  })

])

.then((values)=>{ 

})

.catch((err)=>{
    console.log(err);
});
