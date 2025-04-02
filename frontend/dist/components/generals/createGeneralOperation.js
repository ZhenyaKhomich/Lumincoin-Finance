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
            // this.selects[0].color = 'black';
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
            // const arr = [];
            // let maxNum = 0;
            // if (this.element) {
            //     this.element.forEach(el => {
            //         if (el.id) {
            //             if (el.id > maxNum) {
            //                 maxNum = el.id;
            //             }
            //             arr.push(el.id);
            //         }
            //     })
            //
            //     this.idElement = findMissingNumber(arr, maxNum);
            //
            //     function findMissingNumber(arr, n) {
            //         const expectedSum = (n * (n + 1)) / 2;
            //         const actualSum = arr.reduce((acc, num) => acc + num, 0);
            //         if (expectedSum - actualSum === 0) {
            //             return maxNum + 1;
            //         } else {
            //             return expectedSum - actualSum;
            //         }
            //     }
            // }


            const body = {
                type: this.selects[0].value,
                amount: this.amountElement.value,
                date: this.dataElement.value,
                comment: this.commentElement.value,
                category_id: Number(this.selects[1].options[this.selects[1].selectedIndex].id),
                // category_id: 3,
            }

            const result = await Response.getElementsFromBackend('POST', this.urlRequest, this.accessToken, body);
            this.openNewRouteAutomatic(this.url);
        }
    }

    // validation() {
    //     let isError = true;
    //     this.selects.forEach(select => {
    //         if (select.value === '') {
    //             select.nextElementSibling.style.display = 'block';
    //             select.classList.add('invalid');
    //             isError = false;
    //         } else {
    //             select.nextElementSibling.style.display = 'none';
    //             select.classList.remove('invalid');
    //         }
    //     })
    //     if (this.amountElement.value === '') {
    //         this.amountElement.nextElementSibling.style.display = 'block';
    //         this.amountElement.classList.add('invalid');
    //         isError = false;
    //     } else {
    //         this.amountElement.nextElementSibling.style.display = 'none';
    //         this.amountElement.classList.remove('invalid');
    //     }
    //     if (this.dataElement.value === '' || !/^\d{4}-\d{2}-\d{2}$/.test(this.dataElement.value)) {
    //         this.dataElement.nextElementSibling.style.display = 'block';
    //         this.dataElement.classList.add('invalid');
    //         isError = false;
    //     } else {
    //         this.dataElement.nextElementSibling.style.display = 'none';
    //         this.dataElement.classList.remove('invalid');
    //     }
    //     if (this.commentElement.value === '') {
    //         this.commentElement.nextElementSibling.style.display = 'block';
    //         this.commentElement.classList.add('invalid');
    //         isError = false;
    //     } else {
    //         this.commentElement.nextElementSibling.style.display = 'none';
    //         this.commentElement.classList.remove('invalid');
    //     }
    //     return isError;
    // }

    clickBtnCancel() {
        this.openNewRouteAutomatic(this.url);
    }

}