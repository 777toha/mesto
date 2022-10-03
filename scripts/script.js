const modalEditOpen = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close");
const modalContent = document.querySelector(".modal__content");

// document.addEventListener("DOMContentLoaded", () => {
    
// });

modalEditOpen.addEventListener('click', () => {
    modal.style.display = 'flex';
});

modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target) || e.target === modalCloseBtn) {
        modal.style.display = 'none';
    }
});


const nameOut = document.querySelector(".profile__title");
const jobOut = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".modal__form");
const nameInput = formElement.querySelector(".modal__input_name");
const jobInput = formElement.querySelector(".modal__input_profession");
nameInput.value = nameOut.textContent;
jobInput.value = jobOut.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();

    nameOut.textContent = nameInput.value
    jobOut.textContent = jobInput.value
    modal.style.display = 'none';

};
formElement.addEventListener('submit', formSubmitHandler);




const likeActive = Array.from(document.querySelectorAll(".element__like-button"));
    likeActive.forEach((button, index) => {
        button.addEventListener('click', () => {
            button.classList.toggle("element__like-button_active"); 
        });
    });