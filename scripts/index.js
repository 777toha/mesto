const modalEditOpen = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".popup");
const modalCloseBtn = document.querySelector(".popup__close");
const modalContent = document.querySelector(".popup__content");
const nameOut = document.querySelector(".profile__title");
const jobOut = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_data_name");
const jobInput = formElement.querySelector(".popup__input_data_profession");

function popupOpen() {
    modal.classList.add("popup_opened");
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

// const likeActive = Array.from(document.querySelectorAll(".element__like-button"));
//     likeActive.forEach((button, index) => {
//         button.addEventListener('click', () => {
//             button.classList.toggle("element__like-button_active"); 
//         });
// });

nameInput.value = nameOut.textContent;
jobInput.value = jobOut.textContent;
modalEditOpen.addEventListener('click', popupOpen);
modal.addEventListener('click', popupClose);
// formElement.addEventListener('submit', formSubmitHandler);