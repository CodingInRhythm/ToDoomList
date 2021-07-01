// import newScheme from "./schemes.js";

(async () => {
    let demoBtn = document.getElementById('demo-btn')
    let spinner = document.querySelector('.fa-spinner')

    //TODO: Create loading icon


    // demoBtn.addEventListener('click', async () => {
        console.log('beginning')
        let arrOfData = []
        let res = null;
        let resObj = null;
        res = await fetch(`/app/schemes/${1}`)
        resObj = await res.json()
        arrOfData.push(resObj)
        res = await fetch(`/app/schemes/${2}`)
        resObj = await res.json()
        arrOfData.push(resObj)
        res = await fetch(`/app/schemes/${3}`)
        resObj = await res.json()
        arrOfData.push(resObj)
        res = await fetch(`/app/schemes/${4}`)
        resObj = await res.json()
        arrOfData.push(resObj)

       


        for (let schemeAndPloy of arrOfData) {
            let name = schemeAndPloy.scheme.name
            let res = await fetch('/app/schemes', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            })

            let newScheme = await res.json()
            let newSchemeId = newScheme.scheme.id

           
            for (let ploy of schemeAndPloy.ploys) {
                ploy.schemeId = newSchemeId;


                let res = await fetch('/app/ploys', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ploy)
                })

            }
        }
        demoBtn.classList.remove("hidden")
        spinner.classList.add("hidden")
        // await newScheme.displaySchemes();
})()