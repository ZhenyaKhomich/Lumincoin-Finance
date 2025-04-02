import {CreateCart} from "./createCarts";
import {config, url} from "../../config/config";
import {AuthTokens} from "../utils/auth-utils";
import {Response} from "../utils/response-utils";

export class AddCart {
    constructor(openNewRouteAutomatic,urlRequest, url) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.url = url;
        this.urlRequest = urlRequest;
        this.createBtn = document.getElementById("createCartBtn");
        this.inputCartValue = document.getElementById("nameCreateIncomeElement");
        this.createBtn.onclick = this.addCart.bind(this);
    }

    async addCart() {
        const accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
        if (!accessToken) {
            console.log('No access token');
            return;
        }

        const result = await Response.getElementsFromBackend('POST', this.urlRequest, accessToken, {title: this.inputCartValue.value});

        // const response = await fetch(config.api + this.urlRequest, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'x-auth-token': accessToken,
        //     },
        //     body: JSON.stringify({
        //         title: this.inputCartValue.value
        //     })
        // })
        //
        // const result = await response.json();
        //
        if (result.error || !result.title) {
            console.log(`Error: ${result.message}`)
            return;
        }

        this.openNewRouteAutomatic(this.url);
    }
}