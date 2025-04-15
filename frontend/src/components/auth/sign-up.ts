import {Validation} from "../utils/validation";
import {config} from "../../config/config";
import {AuthTokens} from "../utils/auth-utils";
import {OpenNewRouteAutomaticType} from "../../types/openNewRouteAutomatic.type";
import {ErrorResultResponse, SignUpResultResponse} from "../../types/result-response.type";
import {DataValidationType} from "../../types/validation.type";

export class SignUp {
    readonly openNewRouteAutomatic: OpenNewRouteAutomaticType;
    readonly inputsElement: NodeListOf<HTMLInputElement> | null;
    readonly errorSignUp: HTMLElement | null;
    readonly signUpBtn: HTMLElement | null;
    readonly password: string;

    constructor(openNewRouteAutomatic: OpenNewRouteAutomaticType) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.inputsElement = document.querySelectorAll('.form-floating  input');
        this.errorSignUp = document.getElementById('error-singUp');
        this.signUpBtn = document.getElementById("singUpBtn");
        if (this.signUpBtn) {
            this.signUpBtn.addEventListener("click", this.signUp.bind(this));
        }
        this.password = '';
    }

    private async signUp(): Promise<void> {
        if (this.inputsElement) {
            if (Validation.validForm(this.inputsElement, this.password)) {
                const date: DataValidationType | null = Validation.validForm(this.inputsElement);

                if(date) {
                    const response: Response = await fetch(config.api + '/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            name: date.nameInputElement,
                            lastName: "    ",
                            email: date.emailInputElement,
                            password: date.passwordInputElement,
                            passwordRepeat: date.passwordReplaceInputElement
                        })
                    })

                    const result: SignUpResultResponse | ErrorResultResponse = await response.json();

                    if (!('user' in result)) {
                        if (this.errorSignUp) {
                            this.errorSignUp.innerText = "Ошибка регистрации";
                            return;
                        }
                    } else {
                        if (this.errorSignUp) {
                            this.errorSignUp.innerText = '';
                        }
                    }

                    if ('user' in result && date.passwordInputElement) {
                        await AuthTokens.getTokensAfterRegistration(result.user.email, date.passwordInputElement);
                    }

                    this.openNewRouteAutomatic('/').then();
                }
            } else {
                alert('Ошибка регистрации. Попробуйте снова!');
            }
        }
    }
}