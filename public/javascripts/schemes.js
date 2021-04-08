export default class Scheme {
    constructor() {

    }

    getSchemes = async () =>  {
        const schemes = await fetch('app/schemes')
        const schemesObj = await schemes.json();

        console.log(schemesObj)
    }

}