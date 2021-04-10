const updateSummaryName = (schemeObj) => {
    // const schemeDropdown = document.querySelector(".scheme-dropdown");
    // //Grab target scheme from dropdown and update summary h3
    // const targetScheme = e.target.innerHTML;
    const taskSummaryScheme = document.querySelector(".list-name");
    taskSummaryScheme.innerHTML = schemeObj.scheme.name;
}

const updatePloyCounter = (schemeObj) => {
    console.log(schemeObj)
    let numCompletedPloysCounter = 0
    let numPloysCounter = 0
    let numCompletedPloysContainer = document.getElementById("completed");
    let numPloysContainer = document.getElementById("tasks")
    if (schemeObj.ploys.length) {
        schemeObj.ploys.forEach((ploy) => {
            if (ploy.completed) {
            numCompletedPloysCounter++
            numCompletedPloysContainer.innerHTML = numCompletedPloysCounter 
            }
            numPloysCounter++
            numPloysContainer.innerHTML = numPloysCounter
            });
    }
    else{
        numCompletedPloysContainer.innerHTML = numCompletedPloysCounter
        numPloysContainer.innerHTML = numPloysCounter
    }
}

export {
    updateSummaryName,
    updatePloyCounter
}