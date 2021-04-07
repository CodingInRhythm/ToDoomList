const addPloyToContainer = (ploy) => {
    const ployContainer = document.querySelector(".ploy-container");

    let newPloyDiv = document.querySelector(".ploy.empty");
    if(newPloyDiv){
        newPloyDiv.classList.remove("empty");
    }
    else{
        newPloyDiv = document.createElement("div");
        newPloyDiv.classList.add("ploy");
        ployContainer.append(newPloyDiv);
    }

    const ployDragBar = document.createElement("span");
    ployDragBar.classList.add("ploy__drag-bar");
    newPloyDiv.append(ployDragBar);

    const ployCheckBox = document.createElement("input");
    ployCheckBox.classList.add("ploy__checkbox");
    ployCheckBox.setAttribute("type", "checkbox");
    //Add evebt listener?
    newPloyDiv.append(ployCheckBox);

    const ployDesc = document.createElement("span");
    ployDesc.classList.add("ploy__ploy-desc");
    ployDesc.innerHTML = ploy.desc;
    newPloyDiv.append(ployDesc);

    const ployDueDate = document.createElement("span");
    ployDueDate.classList.add("ploy__due-date");
    ployDueDate.innerHTML = ploy.due;
    newPloyDiv.append(ployDesc);
}

window.addEventListener("DOMContentLoaded", (event) => {

    //Logic for Adding Ploys
    const addPloyForm = document.querySelector(".add-ploy");
    addPloyForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const inputForm = document.querySelector("#add-ploy-field");
        const desc = inputForm.value;
        const due = "Today";

        const testPloy = {desc, due};
        addPloyToContainer(testPloy);
        //1. Fetch to Post to DB
        //2. If success, call addPloyToContainer()
        //3. Else, throw error
    })


})
