import newScheme from "./schemes.js"
window.addEventListener('DOMContentLoaded', async (event) => {
    // console.log(`DISHES A VERY BAD JOKE`);
    const modal = document.getElementById("remove-scheme-modal")
    const mainContainer = document.querySelector(".main-container")
    // modal.style.filter = 'none'
    const addListButton = document.querySelector(".remove-list")
    const exitModalButton = document.getElementById("exit-remove-modal")

    addListButton.addEventListener("click", async (e) => {
        
        const btnRename = document.querySelector(".remove-list");

        await fetch(`/app/schemes/${e.target.id}`, {
            method: "DELETE"
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
