// import { render } from "pug";
// import Ploys from "./ploys.js";
// import newScheme from "./schemes.js";


export default class DemoUser {
    constructor() {

        this.userName = this.generateUserName()
        this.email = this.generateEmail()

        this.fillForm()

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    generateUserName() {
        return `Thanos${this.getRandomInt(10)}${this.getRandomInt(10)}${this.getRandomInt(10)}${this.getRandomInt(10)}`
    }

    generateEmail() {
        return `thanos${this.getRandomInt(10)}${this.getRandomInt(10)}${this.getRandomInt(10)}${this.getRandomInt(10)}demo@floatingchair.com`
    }

    fillForm() {
        document.querySelector('.userName').value = this.userName;
        document.querySelector('.email').value = this.email;

        console.log(document.querySelector('.userName'))
        console.log(document.querySelector('.email'))

    }
}

const demoUser = new DemoUser()
