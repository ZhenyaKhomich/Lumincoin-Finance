import {Main} from "./components/main.js";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('page-title');
        this.contentElement = document.getElementById('content');

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main();
                },
                // scripts: ['moment.min.js', 'moment-ru-locale.js', 'fullcalendar.js', 'fullcalendar-locale-ru.js'],
                // styles: ['fullcalendar.css']
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                load: () => {
                    // new Dashboard(this.openNewRoute.bind(this));
                },
                // scripts: ['moment.min.js', 'moment-ru-locale.js', 'fullcalendar.js', 'fullcalendar-locale-ru.js'],
                // styles: ['fullcalendar.css']
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                load: () => {
                    // new Dashboard(this.openNewRoute.bind(this));
                },
                // scripts: ['moment.min.js', 'moment-ru-locale.js', 'fullcalendar.js', 'fullcalendar-locale-ru.js'],
                // styles: ['fullcalendar.css']
            },
            {
                route: '/404',
                title: 'Ошибка',
                filePathTemplate: '/templates/pages/404.html',
            },
        ]
    }

    initEvents() {
        window.addEventListener("DOMContentLoaded", this.activateRoute.bind(this));
        window.addEventListener("popstate", this.activateRoute.bind(this));
    }

    async activateRoute() {
        const urlRoute = window.location.pathname;
        console.log(urlRoute)

        const newRoute = this.routes.find((route) => route.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + '| Lumincoin Finance';
            }

            if (newRoute.useLayout) {
                this.contentElement.innerHTML = await fetch(newRoute.useLayout).then(res => res.text());
            }

            if (newRoute.filePathTemplate) {
                this.contentElement.innerHTML = await fetch(newRoute.filePathTemplate).then(res => res.text());
            }

            if(newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        }
        // else {
        //     window.location = '/404';
        // }


    }
}