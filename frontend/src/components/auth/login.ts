import {Validation} from "../utils/validation";
import {AuthTokens} from "../utils/auth-utils";
import {OpenNewRouteAutomaticType} from "../../types/openNewRouteAutomatic.type";
import {DataValidationType} from "../../types/validation.type";
import {ErrorResultResponse, LoginResultResponse} from "../../types/result-response.type";

export class Login {
    readonly openNewRouteAutomatic: OpenNewRouteAutomaticType;
    readonly inputsElement: NodeListOf<HTMLInputElement> | null;
    readonly rememberMeInput: HTMLElement | null;
    readonly errorLogin: HTMLElement | null;
    readonly loginBtn: HTMLElement | null;

    constructor(openNewRouteAutomatic: OpenNewRouteAutomaticType) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.inputsElement = document.querySelectorAll('.form-floating  input');
        this.rememberMeInput = document.getElementById('remember-meInput');
        this.errorLogin = document.getElementById('error-login');
        this.loginBtn = document.getElementById('loginBtn');
        if (this.loginBtn) {
            this.loginBtn.addEventListener("click", this.login.bind(this));
        }
    }

    private async login(): Promise<void> {
        if (this.inputsElement && Validation.validForm(this.inputsElement)) {
            const date: DataValidationType | null = Validation.validForm(this.inputsElement);

            if (date) {
                if(date.emailInputElement && date.passwordInputElement) {
                    const emailInputElement: string = date.emailInputElement;
                    const passwordInputElement: string = date.passwordInputElement;
                    const rememberMeInput: boolean = (this.rememberMeInput as HTMLInputElement).checked;

                    const result: LoginResultResponse | ErrorResultResponse | undefined = await AuthTokens.getTokensAfterRegistration(emailInputElement, passwordInputElement, rememberMeInput);
                    if (result) {
                        if (('error' in result) || !('tokens' in result) || !('user' in result)) {
                            if(this.errorLogin) {
                                this.errorLogin.innerText = result.message;
                            }
                            return;
                        } else {
                            if(this.errorLogin) {
                                this.errorLogin.innerText = '';
                            }
                        }

                        this.openNewRouteAutomatic('/').then();
                        return
                    }
                }
            }
            alert('Ошибка при запросе на сервер. Попробуйте снова!');
        }
    }
}