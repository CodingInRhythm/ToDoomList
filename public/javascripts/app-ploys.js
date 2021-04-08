window.addEventListener("DOMContentLoaded", (e) => {
    // Takes in Ploy information and Appends Div to Ploy List
    //Current takes in object {desc: <desc>, due: <due>}
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
        //Add event listener?
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

    //Takes in userId, schemeId, and boolean for complete/incomplete tasks
    //Might need to modify for search
    const displayPloys = (userId, schemeId, complete) => {
        //Steps
        //1. Send GET request using params to query ploys
        const ploys = [
            {desc: "ploy1", due: "Today"},
            {desc: "ploy2", due: ""}];   //Probably won't be in this format?
        //2. Empty out ploy-container
        const ployContainer = document.querySelector(".ploy-container");
        ployContainer.innerHTML = "";
        for(let i = 0; i < 10; i++){
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("ploy", "empty");
            ployContainer.append(emptyDiv);
        }
        //2. Call addPloyToContainer() for every returned ploy
        for(let ploy in ploys){
            addPloyToContainer(ploy);
        }
    }

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

    //Logic for Switching between Incomplete/Complete Task list
    const completeTabs = document.querySelectorAll(".complete-tab");
    completeTabs.forEach(tab => {
        tab.addEventListener("click", (ev) => {
            const activeTab = document.querySelector(".complete-tab.tab-active");
            activeTab.classList.remove("tab-active");
            tab.classList.add("tab-active");

            //Add logic, if tab was changed
            //1. Send Get request to DB to query all complete/incomplete ploys
            //2. If success, reload ploy list
            //3. If fail, throw error (?)
        })
    })
})
