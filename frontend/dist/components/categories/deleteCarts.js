import {config} from "../../config/config";
import {AuthTokens} from "../utils/auth-utils";
import {Response} from "../utils/response-utils";

export class DeleteCart {
    constructor(openNewRouteAutomatic, urlRequest, url) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.urlRequest = urlRequest;
        this.url = url;
        this.incomeElementId = null;
        this.deleteBtnGreen = document.getElementById('deleteBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.deleteBtnGreen.onclick = this.deleteElement.bind(this);
        this.cancelBtn.onclick = this.cancelDelete.bind(this);
    }

    async deleteElement() {
        this.incomeElementId = localStorage.getItem('incomeElementId')
        const accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
        if (!accessToken) {
            console.log('No access token');
            return;
        }

        const result = await Response.getElementsFromBackend('DELETE', this.urlRequest + this.incomeElementId, accessToken);

        // const response = await fetch(config.api + this.urlRequest + this.incomeElementId, {
        //     method: 'DELETE',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'x-auth-token': accessToken,
        //     }
        // })
        //
        // const result = await response.json();
        //
        if (result.error) {
            console.log(`Error: ${result.message}`)
            return;
        }

        this.openNewRouteAutomatic(this.url);
    }

    cancelDelete() {
        this.openNewRouteAutomatic(this.url);
    }
}