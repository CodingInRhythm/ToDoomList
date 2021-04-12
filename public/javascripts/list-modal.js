import newScheme from "./schemes.js"
window.addEventListener('DOMContentLoaded', async (event) => {
    // console.log(`DISHES A VERY BAD JOKE`);
    const modal = document.getElementById("add-scheme-modal")
    const modalButton = document.querySelector(".add-scheme-button")
    const mainContainer = document.querySelector(".main-container")
    modalButton.addEventListener("click", async (e) => {
        //sets modal to be visible, trying to blur out everything else BUT modal
        modal.style.display = 'flex'
        mainContainer.style.filter = 'blur(2px)'
    })
        // modal.style.filter = 'none'
    const addListButton = document.getElementById("add-list")
    const exitModalButton = document.getElementById("exit-modal")

    addListButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const listField = document.getElementById("modal-form")
       
        const name = listField.value
      
        const postedScheme = await fetch('/app/schemes', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"},
            body: JSON.stringify({name})

        })
             newScheme.displaySchemes()
             mainContainer.style.filter = "none";
             modal.style.display = "none";

        })
        exitModalButton.addEventListener("click", (e) => {
           e.preventDefault();
            mainContainer.style.filter = "none";
            modal.style.display = 'none'
        })
    })
