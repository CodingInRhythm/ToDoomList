import { displayPloys } from './app-ploys.js'
import Ploys from "./ploys.js";
import {updateSummary} from "./updateSummary.js"
class Scheme {
    constructor() {

    }

    getScheme = async (id) => {
        const scheme = await fetch(`app/schemes/${id}`);
        return await scheme.json()
    }


    getSchemes = async () =>  {
        // fetches all schemes and make javascript object from response
        const schemes = await fetch('app/schemes')
        return await schemes.json();
    }

    displaySchemes = async () => {

        this.clearSchemesUI();

        const schemesObj = await this.getSchemes()

        // gets HTML div to add schemes to.
        const schemeDropdown = document.querySelector('.scheme-dropdown')

        // iterates over each scheme making a div element attached to page
        schemesObj.schemes.forEach(scheme => {
            let newDiv = document.createElement('div')
            let newSpan = document.createElement('span')
            let button = document.createElement('button')

            button.addEventListener('click', this.displayDropdown) 
            newDiv.addEventListener('click', displayPloys)
            
            newDiv.classList.add('scheme-entry')
            newSpan.innerText = scheme.name
            newDiv.appendChild(newSpan)
            newDiv.appendChild(button)
            newDiv.setAttribute('id', `${scheme.id}`)

            newDiv.addEventListener('click', async () => {
                const schemeObj = await Ploys.getPloys(scheme.id)
                console.log(schemeObj)
                displayPloys(scheme.id)
                updateSummary(schemeObj)
            })

            schemeDropdown.appendChild(newDiv)
        })
    }

    displayDropdown(e) {

        
        let optionsDiv = document.createElement('div');
        let removeDiv = document.createElement('div');
        let renameDiv = document.createElement('div');
        
        let spanRemove = document.createElement('span');
        let spanRename = document.createElement('span');

        spanRemove.innerText = 'Remove Text'
        spanRename.innerText = 'Rename Text'

        console.log(spanRename)
        console.log(spanRemove)
        
        removeDiv.appendChild(spanRemove);
        renameDiv.appendChild(spanRename);
        
        optionsDiv.appendChild(removeDiv);
        optionsDiv.appendChild(renameDiv);
        
        e.target.parentNode.appendChild(optionsDiv);

    }

    clearSchemesUI = () => {
        const schemeDropdown = document.querySelector('.scheme-dropdown');
        schemeDropdown.innerHTML = null;
    };

}

let newScheme = new Scheme();
newScheme.displaySchemes();
export default newScheme
