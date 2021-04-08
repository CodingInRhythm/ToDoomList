

window.addEventListener('DOMContentLoaded', async (event) => {
    const modal = document.querySelector(".add-scheme-modal")
    const modalButton = document.querySelector(".add-scheme-button")

    modalButton.addEventListener("click", async (e) => {
        modal.style.display = 'flex'
        const addListButton = document.getElementById("add-list")
        const exitModalButton = document.getElementById("exit-modal")
        addListButton.addEventListener("click", async (e) => {
            console.log("making it?")
            e.preventDefault()
            const listField = document.getElementById("modal-form")
            console.log(listField)
            const name = listField.value 
            console.log(name)
            const postedScheme = await fetch('/app/schemes', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"},
                body: JSON.stringify({name})
                
            })
             modal.style.display = "none";
            // todo add scheme to sidebar 
            
        })
        exitModalButton.addEventListener("click", (e) => {
            console.log("exitModal")
            modal.style.display = 'none'
        })
    })
})