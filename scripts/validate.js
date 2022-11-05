const showInputError = (errorElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    inputElement.classList.add(errorClass);
    errorElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (errorElement, inputElement, inputErrorClass, errorClass) => {
    inputElement.classList.remove(errorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(inputErrorClass);
}

const handleFormInput = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
        showInputError(errorElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(errorElement, inputElement, inputErrorClass, errorClass);
    };
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonElement(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            handleFormInput(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonElement(inputList, buttonElement);
          });
    });
  };

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    errorClass
}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(document.querySelectorAll(formSelector));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
    });
});
};

 enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input-error_active',
    errorClass: 'popup__input_active'
 });

function hasValidInput(inputsElement) {
    return inputsElement.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
}

function toggleButtonElement(inputsElement, buttonElement) {
    if (hasValidInput(inputsElement)) {
        buttonElement.classList.add('popup__save_disable');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__save_disable');
        buttonElement.disabled = false;
    };
}