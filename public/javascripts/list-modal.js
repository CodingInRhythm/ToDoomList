import newScheme from "./schemes.js"
window.addEventListener('DOMContentLoaded', async (event) => {
    const modal = document.getElementById("add-scheme-modal")
    const modalButton = document.querySelector(".add-scheme-button")
    const mainContainer = document.querySelector(".main-container")
    modalButton.addEventListener("click", async (e) => {
        //sets modal to be visible, trying to blur out everything else BUT modal
        modal.style.display = 'flex'
        mainContainer.style.filter = 'blur(2px)'
        modal.style.filter = 'none' 
        const addListButton = document.getElementById("add-list")
        const exitModalButton = document.getElementById("exit-modal")
        addListButton.addEventListener("click", async (e) => {
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
            newScheme.getSchemes()
             modal.style.display = "none";
             mainContainer.style.filter = "none";
    
        })
        exitModalButton.addEventListener("click", (e) => {
            console.log("exitModal")
            modal.style.display = 'none'
            mainContainer.style.filter = "none";
        })
    })
})