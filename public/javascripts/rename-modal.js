import newScheme from "./schemes.js"
window.addEventListener('DOMContentLoaded', async (event) => {
    // console.log(`DISHES A VERY BAD JOKE`);
    const modal = document.getElementById("rename-scheme-modal")
    const mainContainer = document.querySelector(".main-container")
        // modal.style.filter = 'none'
    const addListButton = document.querySelector(".rename-list")
    const exitModalButton = document.getElementById("exit-rename-modal")

    addListButton.addEventListener("click", async (e) => {
        const listField = document.getElementById("rename-modal-form")
        const btnRename = document.querySelector(".rename-list");
        // console.log(btnRename.id, `AHHHHHHHHHHHHHHHHHHHHHHHH`);
        // console.log(listField)
        const name = listField.value
        // console.log(name)
        await fetch(`/app/schemes/${btnRename.id}`, {
            method: 'PUT',
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
