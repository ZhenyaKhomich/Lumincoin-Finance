export class Layout {
    constructor() {
        this.layoutLinks = document.getElementById('layoutLinks');
            this.elementsLi = this.layoutLinks.querySelectorAll('a');
            this.elementsLi.forEach(el => {
                if(el.pathname === location.pathname) {

                    if(location.pathname === '/incomes' || location.pathname === '/expenses') {
                        el.closest('details').classList.add('checked');
                        el.closest('li').classList.add('checked-category');
                    } else {
                        el.closest('li').classList.add('checked');
                    }
                }
            })
    }
}