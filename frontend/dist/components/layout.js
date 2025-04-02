export class Layout {
    constructor() {
        this.layoutLinks = document.getElementById('layoutLinks');
            this.elementsLi = this.layoutLinks.querySelectorAll('a');
            console.log(location.pathname);
            this.elementsLi.forEach(el => {
                if(el.pathname === location.pathname) {

                    if(location.pathname === '/incomes' || location.pathname === '/expenses') {
                        el.closest('details').classList.add('checked');
                        el.closest('li').classList.add('checked-category');
                    } else {
                        el.closest('li').classList.add('checked');
                    }
                }
                console.log(el.pathname)
            })
    }
    // constructor() {
    //     this.layoutLinks = document.getElementById('layoutLinks');
    //     this.elementsLi = this.layoutLinks.querySelectorAll('li');
    //     this.elementsLi.forEach(el => {
    //         el.onclick = this.clickLi.bind(this);
    //     })
    // }
    //
    // clickLi() {
    //     console.log(event.target.innerText)
    //     this.elementsLi.forEach(el => {
    //         console.log(el)
    //         if(el.innerText === event.target.innerText) {
    //             el.classList.add('checked');
    //         } else {
    //             el.classList.remove('checked');
    //         }
    //     })
    // }

}