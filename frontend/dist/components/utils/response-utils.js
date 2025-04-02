import {AuthTokens} from "./auth-utils";
import {config} from "../../config/config";


export class Response {
    static async getElementsFromBackend(method, url, accessToken, body, params) {
        // const accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
        let headers = {};

        if (accessToken) {
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': accessToken,
            }
        } else {
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        let object = {
            method: method,
            headers: headers,
        }

        if(body) {
            object.body = JSON.stringify(body);
        }

        if(params) {
            object.params = JSON.stringify(params);
        }

        const response = await fetch(config.api + url, object);

        if (!response.status >= 200 && !response.status < 300) {
            console.log('Error fetching incomes from backend');
            return;
        }

        const result = await response.json();
        // await AuthTokens.refreshToken();
        if (result.error) {
            if (result.message === "jwt expired") {
                await AuthTokens.refreshToken();
                // await this.getElementsFromBackend(method, url, accessToken, body);
                return;
            } else {
                console.log(`Error: ${result.message}`);
                localStorage.clear();
            }
        }
        return result;
    }

}