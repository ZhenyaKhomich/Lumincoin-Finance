import {CreateCart} from "../categories/createCarts";
import {AuthTokens} from "../utils/auth-utils";
import {config} from "../../config/config";

export class Expenses {
    constructor() {
        // this.init().then();
        this.incomeElements = document.querySelector('.income-elements');
        // this.elements = null;
        this.btnEdits = null;
        new CreateCart('/categories/expense', '/expenses/edit', '/expenses/popup', '/expenses/create', this.incomeElements);
    }

    // async init() {
    //     await this.getIncomesFromBackend().then();
    //     new CreateCart(this.elements, '/incomes/edit', '/incomes/delete', '/incomes/create', this.incomeElements);
    //     this.getIncomeElementValue();
    // }

    // async getIncomesFromBackend() {
    //     const accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
    //     if (!accessToken) {
    //         console.log('No access token');
    //         return;
    //     }
    //     const response = await fetch(config.api + '/categories/expense', {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'x-auth-token': accessToken,
    //         }
    //     })
    //
    //     if (!response.status >= 200 && !response.status < 300) {
    //         console.log('Error fetching incomes from backend');
    //         return;
    //     }
    //
    //     const result = await response.json();
    //     await AuthTokens.refreshToken();
    //     if (result.error) {
    //         if (result.message === "jwt expired") {
    //             await AuthTokens.refreshToken();
    //             this.getIncomesFromBackend().then();
    //         } else {
    //             console.log(`Error: ${result.message}`);
    //         }
    //     }
    //     this.elements = result;
    // }

    // getIncomeElementValue() {
    //     this.btnEdits = document.querySelectorAll('.btn-edit');
    //     this.btnEdits.forEach((btnEdit) => {
    //         btnEdit.onclick = function () {
    //             const incomeElementTitle = btnEdit.closest('.income-element-buttons').previousElementSibling.innerText;
    //             localStorage.setItem('incomeElementTitle', incomeElementTitle);
    //         }
    //     })
    // }
}