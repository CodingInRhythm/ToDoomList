const addPloyToContainer = (ploy) => {
    const ployContainer = document.querySelector(".ploy-container");

    const newPloyDiv = document.createElement("div");
    newPloyDiv.classList.add("ploy");

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

    ployContainer.append(newPloyDiv);
}

window.addEventListener("DOMContentLoaded", (event) => {

    //Logic for Adding Ploys
    const addPloyForm = document.querySelector(".add-ploy > button");
    addPloyButton.addEventListener("submit", async (event) => {
        event.preventDefault();
        const testPloy = {desc: "Test", due: "today"};
        addPloyToContainer(testPloy);
        //1. Fetch to Post to DB
        //2. If success, call addPloyToContainer()
        //3. Else, throw error
    })


})
