const updateSummary = (schemeObj) => {
    // const schemeDropdown = document.querySelector(".scheme-dropdown");
    // //Grab target scheme from dropdown and update summary h3
    // const targetScheme = e.target.innerHTML;
    const taskSummaryScheme = document.querySelector(".list-name");
    taskSummaryScheme.innerHTML = schemeObj.scheme.name;
    
    let numCompletedPloysCounter = 0
    let numPloysCounter = 0
    const numCompletedPloysContainer = document.getElementById("completed");
    const numPloysContainer = document.getElementById("tasks")
    schemeObj.ploys.forEach((ploy) => {
        if (ploy.completed) {
        numCompletedPloysCounter++
        numCompletedPloysContainer.innerHTML = numCompletedPloysCounter 
        }
        numPloysCounter++
        numPloysContainer.innerHTML = numPloysCounter
   });
}

export {
    updateSummary
}