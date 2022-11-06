const showInputError = (errorElement, inputElement, errorMessage, errorClass) => {
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (errorElement, inputElement, errorClass) => {
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const handleFormInput = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, errorClass);
    } else {
        hideInputError(errorElement, inputElement, errorClass);
    };
}

const hasValidInput = (inputsElement) => {
    return inputsElement.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
}

function toggleButtonElement(inputsElement, buttonElement, inactiveButtonClass) {
    if (hasValidInput(inputsElement)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    };
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, errorClass, inactiveButtonClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonElement(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            handleFormInput(formElement, inputElement, errorClass);
            toggleButtonElement(inputList, buttonElement, inactiveButtonClass);
          });
    });
  };

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    errorClass,
    inactiveButtonClass
    }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => setEventListeners(formElement, inputSelector, submitButtonSelector, errorClass, inactiveButtonClass));
};

 enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input_active',
    inactiveButtonClass: 'popup__save_disable'
 });