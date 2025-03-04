export class Validation {

    static validForm(inputsElement, password = '') {
        let isValid = true;
        let date = {
            nameInputElement: null,
            emailInputElement: null,
            passwordInputElement: null,
            passwordReplaceInputElement: null,
            rememberMeInputElement: null,
        }
        inputsElement.forEach((inputElement) => {
            const parentInputElement = inputElement.closest('.input-block');
            const iconInputElement = inputElement.closest('.form-floating').previousElementSibling;
            isValid = true;

            if (inputElement.value !== '') {
                if(inputElement.type === 'text') {
                    if(inputElement.value.match(/^[А-ЯЁ][а-яё]*(?:\s[А-ЯЁ][а-яё]*)+$/)) {
                        date.nameInputElement = inputElement.value;
                        inputElement.classList.remove('invalid');
                        iconInputElement.classList.remove('invalid');
                        parentInputElement.nextElementSibling.classList.remove('invalid');
                    } else {
                        inputElement.classList.add('invalid');
                        iconInputElement.classList.add('invalid');
                        parentInputElement.nextElementSibling.classList.add('invalid');
                        isValid = false;
                    }
                }
                if (inputElement.type === 'email') {
                    if (inputElement.value && inputElement.value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/)) {
                        date.emailInputElement = inputElement.value;
                        inputElement.classList.remove('invalid');
                        iconInputElement.classList.remove('invalid');
                        parentInputElement.nextElementSibling.classList.remove('invalid');
                    } else {
                        inputElement.classList.add('invalid');
                        iconInputElement.classList.add('invalid');
                        parentInputElement.nextElementSibling.classList.add('invalid');
                        isValid = false;
                    }
                } else if(inputElement.type !== 'text')  {
                    inputElement.classList.remove('invalid');
                    iconInputElement.classList.remove('invalid');
                    parentInputElement.nextElementSibling.classList.remove('invalid');
                }
                if (inputElement.type === 'password' ) {
                    if (inputElement.value.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/) && password === '') {
                        date.passwordInputElement = inputElement.value;
                        inputElement.classList.remove('invalid');
                        iconInputElement.classList.remove('invalid');
                        parentInputElement.nextElementSibling.classList.remove('invalid');
                        password = inputElement.value;
                    } else if (password !== '' && inputElement.value === password) {
                        date.passwordReplaceInputElement = inputElement.value;
                        inputElement.classList.remove('invalid');
                        iconInputElement.classList.remove('invalid');
                        parentInputElement.nextElementSibling.classList.remove('invalid');
                    } else {
                        inputElement.classList.add('invalid');
                        iconInputElement.classList.add('invalid');
                        parentInputElement.nextElementSibling.classList.add('invalid');
                        isValid = false;
                    }
                }
            } else {
                inputElement.classList.add('invalid');
                iconInputElement.classList.add('invalid');
                parentInputElement.nextElementSibling.classList.add('invalid');
                isValid = false;
            }
        })

        if (isValid) {
            return date;
        }
        return false;
    }
}