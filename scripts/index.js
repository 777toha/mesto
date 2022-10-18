const modalEditOpen = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".popup");
const modalCloseBtn = document.querySelector(".popup__close");
const modalContent = document.querySelector(".popup__container");
const nameOut = document.querySelector(".profile__title");
const jobOut = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_data_name");
const jobInput = formElement.querySelector(".popup__input_data_profession");

function popupOpen() {
    modal.classList.add("popup_opened");
    nameInput.value = nameOut.textContent;
    jobInput.value = jobOut.textContent;
};

function popupClose(e) {
    if (!modalContent.contains(e.target) || e.target === modalCloseBtn) {
        modal.classList.remove("popup_opened");
    }
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameOut.textContent = nameInput.value
    jobOut.textContent = jobInput.value
    popupClose(modal);
};

modalEditOpen.addEventListener('click', popupOpen);
modal.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

// project 2

const item = [
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

const elements = document.querySelector(".elements"); // куда подставлять карточки
const elementTempale = document.querySelector("#element-template").content;

const addElement = (item) => {
    const elementCard = elementTempale.querySelector(".element").cloneNode(true);
    const elementImage = elementCard.querySelector(".element__image");
    const elementTitle = elementCard.querySelector(".element__title");
    elementTitle.textContent = item.name;
    elementImage.src = item.link;
    elementImage.alt = item.name;

    elements.prepend(elementCard);
    
  };

item.forEach(addElement);

// открытие и закрытие попапа для добавление карточек
const popupOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_card-add");
const popupCloseAddCard = document.querySelector(".popup__close_card-add");
const modalContentAddCard = popupAddCard.querySelector(".popup__container");

popupOpenAddCard.addEventListener('click', function() {
    popupAddCard.classList.add("popup_opened");
});
// по контенеру не закрываеться
popupAddCard.addEventListener('click', (e) => {
    if (!modalContentAddCard.contains(e.target) || e.target === popupCloseAddCard) {
        popupAddCard.classList.remove("popup_opened");
    }
});

// добавление карточек
const formSubmitCard = popupAddCard.querySelector(".popup__form");
const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const placeName = popupAddCard.querySelector('.popup__input_data_name');
    const placeUrl = popupAddCard.querySelector('.popup__input_data_profession');

    const newPlaceName = placeName.value;
    const newPlaceUrl = placeUrl.value;

    const NewAddElement = addElement({name: newPlaceName, link: newPlaceUrl});

    elements.append(NewAddElement);   

};

formSubmitCard.addEventListener('submit', handleFormSubmit)


