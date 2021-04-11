// import newScheme from "./schemes.js";

(async () => {
    let demoBtn = document.querySelector('.demo-btn')
    console.log('Hey!?!?!?!?!')
    // demoBtn.addEventListener('click', async () => {
        console.log('HERE')
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

        console.log(arrOfData[1])
        console.log(arrOfData[1].scheme)
        console.log(arrOfData[1].ploys)
        console.log(arrOfData[1].ploys[0])


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

            console.log(schemeAndPloy.ploys, "PLOYYYYYYYS")
            for (let ploy of schemeAndPloy.ploys) {
                ploy.schemeId = newSchemeId;

                console.log(ploy.schemeId, "PLOYS")

                let res = await fetch('/app/ploys', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ploy)
                })

            }

        }
        // await newScheme.displaySchemes();
})()