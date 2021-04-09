import Ploys from "./ploys.js";

let schemeId = 1;
window.addEventListener("DOMContentLoaded", (e) => {
    //Logic for Adding Ploys from Form
    const addPloyForm = document.querySelector(".add-ploy");
    addPloyForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const inputForm = document.querySelector("#add-ploy-field");
        const name = inputForm.value;
        const dueAt = null;

        const addPloy = {name, dueAt, schemeId: schemeId, completed: false};
        const postPloy = await Ploys.createPloy(addPloy);

        //Ploy is incomplete by default, only update page if on incomplete tab
        const activeTab = document.querySelector(".complete-tab.tab-active");
        if(activeTab.innerHTML === "Incomplete"){
            addPloyToContainer(postPloy.ploy);
            createPloyDataDiv(postPloy.ploy);
        }
        inputForm.value = "";
    })

    //Event Listener for Deleting Ploys
    const deleteTaskButton = document.querySelector(".delete_ploy");
    deleteTaskButton.addEventListener("click", async (ev) => {
        //1. Get all Selected Ploys
        let selected = getSelectedPloys();

        //2. Send DELETE requests for ploys
        await Promise.all(selected.map(async (ploy) => {
            await Ploys.deletePloy(ploy.id);
        }));
        //3. Redisplay ploy table
        const schemeObj = await Ploys.getPloys(schemeId);
        await displayPloys(schemeObj);
    })

    //Event Listener for Marking Tasks as Complete/Uncomplete
    const markCompleteButton = document.querySelector(".mark_complete");
    markCompleteButton.addEventListener("click", async (ev) => {
        //1. Get all Selected Ploys
        let selected = getSelectedPloys();

        //2. Send PUT request to change completed flag
        const markComplete =markCompleteButton.innerHTML === "Completed"
        await Promise.all(selected.map(async (ploy) => {
            const ployObj = {name: ploy.name, schemeId: schemeId, completed: markComplete}
            await Ploys.updatePloy(ploy.id, ployObj);
        }));
        //3. Redisplay ploy table
        const schemeObj = await Ploys.getPloys(schemeId);
        await displayPloys(schemeObj);
    })

    //Logic for Switching between Incomplete/Complete Task list
    const completeTabs = document.querySelectorAll(".complete-tab");
    completeTabs.forEach(tab => {
        tab.addEventListener("click", async (ev) => {
            const activeTab = document.querySelector(".complete-tab.tab-active");
            activeTab.classList.remove("tab-active");
            tab.classList.add("tab-active");

            const switchToCompleted = tab.innerHTML==="Completed";
            // Switch action menu button for Completing/Uncompleting tasks
            if(switchToCompleted){
                markCompleteButton.innerHTML = "Uncompleted";
            } else{
                markCompleteButton.innerHTML = "Completed";
            }

            //Check if tab was changed for optimization?
            const schemeObj = await Ploys.getPloys(schemeId);
            await displayPloys(schemeObj);
        })
    })

    //Logic for adding ploys from search list
    const searchBar = document.querySelector(".search");
    searchBar.addEventListener("submit", async (event) => {
      event.preventDefault();

      //1. Fetch all queried ploys
      const input = document.querySelector("#search-bar");
      const string = input.value;

      const ploysObj = await Ploys.searchPloys(string);

      const activeTab = document.querySelector(".complete-tab.tab-active");
      const completed = activeTab.innerHTML === "Completed";

      //2. Empty out ploy-container
      const ployContainer = document.querySelector(".ploy-container");
      ployContainer.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("ploy", "empty");
        ployContainer.append(emptyDiv);
      }

      //2.5 Clear ploy data divs
      const mainBody = document.querySelector(".ploy-data-container");
      mainBody.innerHTML = "";
      //2. Call addPloyToContainer() for every returned ploy
      ploysObj.ploys.forEach((ploy) => {
         {
             addPloyToContainer(ploy);
             createPloyDataDiv(ploy);
        }
      });
    });
    //Default display?
    // let schemesTest = await Ploys.getPloys(1);
    // displayPloys(schemesTest);
})

// Takes in Ploy information and Appends Div to Ploy List
    //Current takes in object with {id: <id> name: <name>, dueAt: <dueAt>}
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
        newPloyDiv.id = ploy.id;    //Adding ploy id to div for access later

        const ployDragBar = document.createElement("span");
        ployDragBar.classList.add("ploy__drag-bar");
        newPloyDiv.append(ployDragBar);

        const ployCheckBox = document.createElement("input");
        ployCheckBox.classList.add("ploy__checkbox");
        ployCheckBox.setAttribute("type", "checkbox");
        newPloyDiv.append(ployCheckBox);

        const ployDesc = document.createElement("span");
        ployDesc.classList.add("ploy__ploy-desc");
        ployDesc.innerHTML = ploy.name;
        newPloyDiv.append(ployDesc);

        const ployDueDate = document.createElement("span");
        ployDueDate.classList.add("ploy__due-date");
        ployDueDate.innerHTML = ploy.dueAt;
        newPloyDiv.append(ployDueDate);

        //If click anywhere in div, will check/uncheck checkbox, display info on right
        newPloyDiv.addEventListener("click", (ev) => {
            ev.stopPropagation();
            let targetId = ev.target.id;
            //If it clicks child div
            if(targetId === ""){
                targetId = ev.target.parentElement.id;
            }
            if(ev.target.className !== "ploy__checkbox"){
                //If other divs are selected, uncheck, else just toggle
                let selected = getSelectedPloys();
                if(selected.length >= 1){
                    if(selected.length === 1 && selected[0].id === targetId){
                        ployCheckBox.checked = false;
                    } else{
                        selected.forEach(ploy => {
                            const checkBox = ploy.querySelector(".ploy__checkbox");
                            checkBox.checked = false;
                        })
                        ployCheckBox.checked = true;
                    }
                }
                else{
                    ployCheckBox.checked = !ployCheckBox.checked;
                }
            }
            displayPloyData(ployCheckBox.checked, targetId);
        })
    }

    //Scheme object should be an object containing {scheme, ploys} (result of calling Ploys.getPloys());
    const displayPloys = (schemeObj) => {
        //Steps
        //0. Check if on completed tab or not
        const activeTab = document.querySelector(".complete-tab.tab-active");
        const completed = (activeTab.innerHTML === "Completed");

        //1. Send GET request using params to query ploys
        // const schemeObj = await Ploys.getPloys(e);
        //Placeholder, remove once scheme call is changed
        // if(typeof schemeObj === "number"){
        //     schemeObj = await Ploys.getPloys(schemeObj);
        // }

        //Note: quick hack, will probably want to change
        schemeId = schemeObj.scheme.id;

        //2. Empty out ploy-container
        const ployContainer = document.querySelector(".ploy-container");
        ployContainer.innerHTML = "";
        for(let i = 0; i < 10; i++){
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("ploy", "empty");
            ployContainer.append(emptyDiv);
        }

        //2.5 Clear ploy data divs
        const mainBody = document.querySelector(".ploy-data-container");
        mainBody.innerHTML = "";

        //3. Call addPloyToContainer() for every returned ploy + create hidden data divs
        schemeObj.ploys.forEach((ploy) => {
            if(ploy.completed === completed){
                addPloyToContainer(ploy);
                createPloyDataDiv(ploy);
            }
        });
    }

    // Helper function, returns all Ploys that have checked Checkboxes
    const getSelectedPloys = () => {
        const allPloys = document.querySelectorAll(".ploy:not(.empty)");
        let selected = [];
        allPloys.forEach(ploy => {
            const checkBox = ploy.querySelector(".ploy__checkbox");
            if(checkBox.checked){
                selected.push(ploy);
            }
        })
        return selected;
    }

    //Will toggle ploy data div on right part of body
    //Display argument should be boolean of whether to show or hide
    //id argument should be ployId
    const displayPloyData = (display, id) => {
        const shownDataDiv = document.querySelector(".ploy-data:not(.hidden)");
        if(shownDataDiv && shownDataDiv.id !== `data-${id}`){
            shownDataDiv.classList.add("hidden");
        }
        const ployDataDiv = document.getElementById(`data-${id}`);
        if(display){
            ployDataDiv.classList.remove("hidden");
        }
        else{
            ployDataDiv.classList.add("hidden");
        }
    }

    // Creates hidden ploy data divs that will display on right body
    const createPloyDataDiv = (ploy) => {
        const mainBody = document.querySelector(".ploy-data-container");
        const dataDiv = document.createElement("div");
        dataDiv.classList.add("ploy-data", "hidden")
        dataDiv.id = `data-${ploy.id}`;
        mainBody.append(dataDiv);

        //Creating Name/Rename ploy form
        const nameForm = document.createElement("form");
        nameForm.classList.add("ploy-data__name-form");

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.value = ploy.name;

        const renameButton = document.createElement("button");
        renameButton.setAttribute("type", "submit");
        renameButton.innerHTML = "Rename";
        renameButton.addEventListener("click", async (ev) => {
            ev.preventDefault();
            let newName = nameInput.value;
            //Still works even without passing in completed?
            const ployObj = {name: newName, schemeId: schemeId}
            await Ploys.updatePloy(ploy.id, ployObj);

            const schemeObj = await Ploys.getPloys(schemeId);
            await displayPloys(schemeObj);
        })
        nameForm.append(nameInput);
        nameForm.append(renameButton);

        //Due date display
        const dueDiv = document.createElement("div");
        dueDiv.classList.add("ploy-data__data-field");
        const dueLabelSpan = document.createElement("span");
        dueLabelSpan.classList.add("ploy-data__data-field__label");
        dueLabelSpan.innerHTML = "Due: ";
        const dueAtSpan = document.createElement("span");
        dueAtSpan.classList.add("ploy-data__data-field__data");
        if(ploy.dueAt){
            dueAtSpan.innerHTML = ploy.dueAt;
        } else {
            dueAtSpan.innerHTML = "Never";
        }

        dueDiv.append(dueLabelSpan);
        dueDiv.append(dueAtSpan);

        //Add scheme div
        const schemeDiv = document.createElement("div");
        schemeDiv.classList.add("ploy-data__data-field");
        const schemeLabelSpan = document.createElement("span");
        schemeLabelSpan.innerHTML = "Scheme: ";
        schemeLabelSpan.classList.add("ploy-data__data-field__label");
        const schemeSpan = document.createElement("span");
        schemeSpan.innerHTML = ploy.schemeId;     //Should figure out how to get Scheme name
        schemeSpan.classList.add("ploy-data__data-field__data");
        schemeDiv.append(schemeLabelSpan);
        schemeDiv.append(schemeSpan);

        dataDiv.append(nameForm);
        dataDiv.append(dueDiv);
        dataDiv.append(schemeDiv);
    }

export {
    displayPloys,
}
