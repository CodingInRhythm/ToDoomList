import { displayPloys } from './app-ploys.js'
import Ploys from "./ploys.js";
import { updateSummaryName, updatePloyCounter } from "./updateSummary.js"
import queryTracker from "./ploy-query.js";

class Scheme {
    constructor() {
        this.dropDownArrow()
    }

    dropDownArrow() {
        let dropDownButton = document.querySelector('#schemes-arrow')
        let arrowEle = document.querySelector('#schemes-arrow-i')
        console.log(arrowEle)
        arrowEle.classList.add('rotate-arrow')

        dropDownButton.addEventListener('click', this.toggleSchemes)
    }

    toggleSchemes() {
        let arrowEle = document.querySelector('#schemes-arrow-i')
        let schemeList = document.querySelector('.schemes-list')
        if (schemeList.classList.contains('hidden')) {
            arrowEle.classList.remove('rotate-arrow')
            schemeList.classList.remove('hidden')
        } else {
            arrowEle.classList.add('rotate-arrow')
            schemeList.classList.add('hidden')
        }
        console.log(arrowEle)
        // schemes = document.getElementsByClassName('.scheme')
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
        const schemeDropdown = document.querySelector('.schemes-list')
        schemeDropdown.classList.add('hidden')

        // iterates over each scheme making a div element attached to page
        schemesObj.schemes.forEach(scheme => {
            let newDiv = document.createElement('div')
            let newSpan = document.createElement('span')
            let button = document.createElement('a')
            button.href = '#'
            button.innerHTML = `<i id="${scheme.id}" class="fa fa-caret-square-down"></i>`

            // button.addEventListener('click', this.displayDropdown.bind(this))
            // newDiv.addEventListener('click', displayPloys)

            newDiv.classList.add('scheme-entry')
            newSpan.innerText = scheme.name
            newSpan.classList.add('cut-text')
            newDiv.appendChild(newSpan)
            newDiv.appendChild(button)
            this.makedropdDown(button, newDiv, scheme.id)
            newDiv.setAttribute('id', `${scheme.id}`)

            newDiv.addEventListener('click', async () => {
                const schemeObj = await queryTracker.makeNewQuery("schemeId", scheme.id);
                await displayPloys(schemeObj)
                updateSummaryName(schemeObj)
                updatePloyCounter(schemeObj)
            })

            schemeDropdown.appendChild(newDiv)
        })
    }


    makedropdDown(button, newDiv, schemeId) {

        let optionsDiv = document.createElement('div');
        let removeDiv = document.createElement('div');
        let renameDiv = document.createElement('div');

        removeDiv.classList.add('scheme-action-buttons')
        renameDiv.classList.add('scheme-action-buttons')

        optionsDiv.classList.add('dropdown-content')
        optionsDiv.classList.add("hidden")

        button.addEventListener('click', this.toggleDisplay.bind(this, optionsDiv))

        let spanRemove = document.createElement('span');
        let spanRename = document.createElement('span');

        spanRename.setAttribute('id', `${schemeId}`)
        spanRemove.setAttribute('id', `${schemeId}`)

        spanRename.setAttribute('class', 'rename-btn');


        const mainContainer = document.querySelector(".main-container");

        spanRemove.innerText = 'Remove Scheme'
        spanRename.innerText = 'Rename Scheme'

        spanRename.addEventListener("click", async (e) => {
            const modal = document.getElementById("rename-scheme-modal");
            // e.stopImmediatePropagation();
            const btnRename = document.querySelector(".rename-list");
            btnRename.setAttribute('id', `${e.target.id}`)
            // console.log(e.target.parentNode.parentNode.parentNode.id);
            //? Sets modal to be visible, trying to blur out everything else BUT modal
            modal.style.display = 'flex'
            mainContainer.style.filter = 'blur(2px)'
        })

        spanRemove.addEventListener('click', async (e) => {
            const modal = document.getElementById("remove-scheme-modal");
            // e.stopImmediatePropagation();
            const btnRename = document.querySelector(".remove-list");
            btnRename.setAttribute('id', `${e.target.id}`)
            // console.log(e.target.parentNode.parentNode.parentNode.id);
            //? Sets modal to be visible, trying to blur out everything else BUT modal
            modal.style.display = 'flex'
            mainContainer.style.filter = 'blur(2px)'
        })
        // spanRename.addEventListener('click', this.showRenameModal)


        removeDiv.appendChild(spanRemove);
        renameDiv.appendChild(spanRename);

        optionsDiv.appendChild(removeDiv);
        optionsDiv.appendChild(renameDiv);

        button.appendChild(optionsDiv)


        // e.target.parentNode.appendChild(optionsDiv);

    }

    toggleDisplay(optionsDiv, e) {
        if (optionsDiv.classList.contains('hidden')) {
            optionsDiv.classList.remove('hidden');
        } else {
            optionsDiv.classList.add('hidden');
        }
    }

    showRemoveModal = async (e) => {
        e.stopPropagation()

        console.log(e.target)
        // console.log(e.target.parentNode.parentNode.parentNode, 'und')

        await fetch(`app/schemes/${e.target.id}`, {
            method: "DELETE"
        })

        this.displaySchemes()

    }

    showRenameModal = (e) => {
        e.stopPropagation()

    }

    clearSchemesUI = () => {
        const schemeDropdown = document.querySelector('.schemes-list');
        schemeDropdown.innerHTML = null;
    };

}


let newScheme = new Scheme();
newScheme.displaySchemes();
export default newScheme
