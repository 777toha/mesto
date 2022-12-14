export class FormValidator {
    constructor(options, formElement) {
        this._formElement = formElement;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inputErrorClass =options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._inactiveButtonClass = options.inactiveButtonClass;

        this._buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    }

    _showInputError(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._errorClass);
        this._errorElement.textContent = errorMessage;
    }
    
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    }
    
    _handleFormInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    }
    
    _hasValidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonElement() {
        if (this._hasValidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        };
    }

    resetValidation() {
        this._toggleButtonElement();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        });
  
      } 
    
    _setEventListeners() {
        this._toggleButtonElement();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._handleFormInput(inputElement);
                this._toggleButtonElement();
              });
        });
      };
    
    enableValidation() {
        this._setEventListeners();
    };
}