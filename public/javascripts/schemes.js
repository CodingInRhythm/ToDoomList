import { displayPloys } from './app-ploys.js'

class Scheme {
    constructor() {

    }

    getSchemes = async () =>  {
        // fetches all schemes and make javascript object from response
        const schemes = await fetch('app/schemes')
        const schemesObj = await schemes.json();

        // gets HTML div to add schemes to. 
        const schemeDropdown = document.querySelector('.scheme-dropdown') 

        // iterates over each scheme making a div element attached to page
        schemesObj.schemes.forEach(scheme => {
            let newDiv = document.createElement('div')
            let newSpan = document.createElement('span')
            newDiv.classList.add('scheme-entry')
            newSpan.innerText = scheme.name
            newDiv.appendChild(newSpan)
            newDiv.setAttribute('id', `${scheme.id}`)
            newDiv.addEventListener('click', displayPloys)
            schemeDropdown.appendChild(newDiv)
        })
    }

}

let newScheme = new Scheme();
newScheme.getSchemes();
export default newScheme
