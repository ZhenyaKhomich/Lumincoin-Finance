import {Response} from "../utils/response-utils";
import {AuthTokens} from "../utils/auth-utils";
import {url} from "../../config/config";
import {Validation} from "../utils/validation";

export class CreateGeneralOperation {
    constructor(openNewRouteAutomatic, urlRequest, url) {
        this.openNewRouteAutomatic = openNewRouteAutomatic;
        this.urlRequest = urlRequest;
        this.url = url;
        this.amountElement = document.getElementById('sumCreateGeneralElement');
        this.dataElement = document.getElementById('dataCreateGeneralElement');
        this.commentElement = document.getElementById('commentCreateGeneralElement');
        this.btnCreate = document.getElementById("btn-create");
        this.btnCancel = document.getElementById("btn-cancel");
        this.accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
        this.selects = document.querySelectorAll('select');
        this.selectColorText();
        this.btnCancel.onclick = this.clickBtnCancel.bind(this);
        this.btnCreate.onclick = this.clickBtnCreate.bind(this);
    }

    selectColorText() {
        this.selects.forEach(select => {
            select.style.color = '#6c757d';

            select.addEventListener('focus', (e) => {
                select.style.color = 'black';
            })

            select.addEventListener('blur', (e) => {
                if (select.value === '') {
                    select.style.color = '#6c757d';
                }
            })
        })
        this.selects[0].addEventListener('change', (e) => {
            this.addSelectCategoryValue().then();
        })
    }

    async addSelectCategoryValue() {
        let urlRequest = null;
        this.accessToken = AuthTokens.getToken(AuthTokens.accessTokenKey);
        if (this.selects[0].value === 'income') {
            urlRequest = url.changeIncomes;
        } else {
            urlRequest = url.changeExpenses;
        }
        this.element = await Response.getElementsFromBackend('GET', urlRequest, this.accessToken);
        this.createSelectOptionsCategory();
    }

    createSelectOptionsCategory() {
        this.selects[1].querySelectorAll('option').forEach(option => {
            if (option.value !== '') {
                option.remove();
            }
        })

        for (let i = 0; i < this.element.length; i++) {
            const option = document.createElement('option');
            option.value = this.element[i].title;
            option.id = this.element[i].id;
            option.innerText = this.element[i].title;
            this.selects[1].appendChild(option);
        }
    }

    async clickBtnCreate() {
        if (Validation.validationGenerals(this.selects, this.amountElement, this.dataElement, this.commentElement)) {

            const body = {
                type: this.selects[0].value,
                amount: this.amountElement.value,
                date: this.dataElement.value,
                comment: this.commentElement.value,
                category_id: Number(this.selects[1].options[this.selects[1].selectedIndex].id),
            }

            const result = await Response.getElementsFromBackend('POST', this.urlRequest, this.accessToken, body);
            if(result) {
                this.openNewRouteAutomatic(this.url);
            }
        }
    }

    clickBtnCancel() {
        this.openNewRouteAutomatic(this.url);
    }
}