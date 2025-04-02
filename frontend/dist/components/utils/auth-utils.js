import {config} from "../../config/config";
import {Response} from "./response-utils";
import {Router} from "../../router";


export class AuthTokens {
    constructor(openNewRouteAutomatic) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
    }


    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoTokenKey = 'userInfo';

    static setToken(tokenName, tokenValue) {
        localStorage.setItem(tokenName, tokenValue);
    }

    static getToken(tokenName) {
        return localStorage.getItem(tokenName);
    }

    static async getTokensAfterRegistration(email, password, rememberMe = false) {

        const result = await Response.getElementsFromBackend('POST', '/login', null, {
                    email: email,
                    password: password,
                    rememberMe: rememberMe,
                });
        // const response = await fetch(config.api + '/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //         rememberMe: rememberMe,
        //     })
        // })
        //
        // const result = await response.json();

        if (result.error || !result.tokens || !result.user) {
            return result;
        }

        AuthTokens.setToken(AuthTokens.accessTokenKey, result.tokens.accessToken);
        AuthTokens.setToken(AuthTokens.refreshTokenKey, result.tokens.refreshToken);
        AuthTokens.setToken(AuthTokens.userInfoTokenKey, JSON.stringify(result.user));

        return result;
    }

    static async refreshToken() {
        const refreshToken = AuthTokens.getToken(AuthTokens.refreshTokenKey);

        const result = await Response.getElementsFromBackend('POST', '/refresh', null, {refreshToken: refreshToken});
        // const response = await fetch(config.api + '/refresh', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         refreshToken: refreshToken
        //     })
        // })
        //
        // const result = await response.json();
console.log('Обновился refresh токен')
        if (result.error || !result.tokens) {
            console.log('Refresh token устарел')
            localStorage.clear();
            return;
        }


        AuthTokens.setToken(AuthTokens.accessTokenKey, result.tokens.accessToken);
        AuthTokens.setToken(AuthTokens.refreshTokenKey, result.tokens.refreshToken);
    }
}