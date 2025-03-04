import {Validation} from "../utils/validation";
import {config} from "../../config/config";
import {AuthTokens} from "../../utils/auth-utils";

export class Login {
    constructor(openNewRouteAutomatic) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.inputsElement = document.querySelectorAll('.form-floating  input');
        this.rememberMeInput = document.getElementById('remember-meInput');
        this.errorLogin = document.getElementById('error-login');
        document.getElementById("loginBtn").addEventListener("click", this.login.bind(this));
    }

    async login() {
        if (Validation.validForm(this.inputsElement)) {
            const date = Validation.validForm(this.inputsElement);

            const result = await AuthTokens.getTokensAfterRegistration(date.emailInputElement, date.passwordInputElement, this.rememberMeInput.checked);
            // const response = await fetch(config.api + '/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         email: date.emailInputElement,
            //         password: date.passwordInputElement,
            //         rememberMe: this.rememberMeInput.checked,
            //     })
            // })
            //
            // const result = await response.json();
            //
            if (result.error || !result.tokens || !result.user) {
                this.errorLogin.innerText = result.message;
                return;
            } else {
                this.errorLogin.innerText = '';
            }
            //
            // AuthTokens.setToken(AuthTokens.accessTokenKey, result.tokens.accessToken);
            // AuthTokens.setToken(AuthTokens.refreshTokenKey, result.tokens.refreshToken);
            // AuthTokens.setToken(AuthTokens.userInfoTokenKey, JSON.stringify(result.user));
            //
            this.openNewRouteAutomatic('/');

        } else {
            alert('Ошибка при запросе на сервер. Попробуйте снова!');
        }
    }
}