// import newScheme from "./schemes.js";

(async () => {
    let demoBtnForm = document.getElementById('demo-btn-form')
    let loader = document.querySelector('.loader')
       console.log("here");
    //TODO: Create loading icon
    demoBtnForm.classList.add("hidden");
    loader.classList.remove("hidden");

    // demoBtn.addEventListener('click', async () => {
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

       
        // fetch all schemes of user, if they have schemes 
        // then do not run logic to generate/seed more.
        const schemes = await fetch('/app/schemes')
        let all_schemes = await schemes.json();
        console.log(all_schemes)
        if (all_schemes.schemes.length) {
           demoBtnForm.classList.remove("hidden");
           loader.classList.add("hidden");
            return 
        }

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
        demoBtnForm.classList.remove("hidden")
        loader.classList.add("hidden")

})()