

window.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.querySelector("#search-bar")
    searchBar.addEventListener("submit", async (event) => {
        event.preventDefault()
        console.log(searchBar)
        const string = searchBar.value
        console.log(string)
        const ploys = await fetch(`/app/search/${string}`)
        const parsedPloys = await ploys.json()
        console.log(parsedPloys)
    
    } )
})