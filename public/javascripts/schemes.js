import { displayPloys } from './app-ploys.js'
import Ploys from "./ploys.js";
import {updateSummaryName, updatePloyCounter} from "./updateSummary.js"

class Scheme {
    constructor() {

    }

    getScheme = async (id) => {
        const scheme = await fetch(`app/schemes/${id}`);
        return await scheme.json()
    }


    getSchemes = async () => {
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

            button.addEventListener('click', this.displayDropdown.bind(this))
            // newDiv.addEventListener('click', displayPloys)

            newDiv.classList.add('scheme-entry')
            newSpan.innerText = scheme.name
            newDiv.appendChild(newSpan)
            newDiv.appendChild(button)
            newDiv.setAttribute('id', `${scheme.id}`)

            newDiv.addEventListener('click', async () => {
                const schemeObj = await Ploys.getPloys(scheme.id)
                await displayPloys(schemeObj)
                updateSummaryName(schemeObj)
                updatePloyCounter(schemeObj)
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

        spanRemove.innerText = 'Remove Scheme'
        spanRename.innerText = 'Rename Scheme'

        console.log(spanRemove)
        console.log(spanRename)

        spanRemove.addEventListener('click', this.showRemoveModal)
        spanRename.addEventListener('click', this.showRenameModal)


        removeDiv.appendChild(spanRemove);
        renameDiv.appendChild(spanRename);

        optionsDiv.appendChild(removeDiv);
        optionsDiv.appendChild(renameDiv);

        e.target.parentNode.appendChild(optionsDiv);

    }

    showRemoveModal = async (e) => {
        e.stopPropagation()

        console.log(e.target.parentNode.parentNode.parentNode, 'und')

        await fetch(`app/schemes/${e.target.parentNode.parentNode.parentNode.id}`, {
            method: "DELETE"
        })

        this.displaySchemes()

    }

    showRenameModal = (e) => {
        e.stopPropagation()
        console.log(e, 'rename');
    }

    clearSchemesUI = () => {
        const schemeDropdown = document.querySelector('.scheme-dropdown');
        schemeDropdown.innerHTML = null;
    };

}

let newScheme = new Scheme();
newScheme.displaySchemes();
export default newScheme