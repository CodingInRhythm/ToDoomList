class Scheme {
    constructor() {

    }

    getSchemes = async () =>  {
        // fetches all schemes and make javascript object from response
        const schemes = await fetch('app/schemes')
        const schemesObj = await schemes.json();
        const schemeDropdown = document.querySelector('.scheme-dropdown')        // gets HTML div to add schemes to. 

        // iterates over each scheme making a div element attached to page
        schemesObj.schemes.forEach(scheme => {
            let newDiv = document.createElement('div')
            let newSpan = document.createElement('span')
            newDiv.classList.add('scheme-entry')
            newSpan.innerText = scheme.name
            newDiv.appendChild(newSpan)
            schemeDropdown.appendChild(newDiv)
        })

    }

}

let newScheme = new Scheme();
newScheme.getSchemes();
export default newScheme
