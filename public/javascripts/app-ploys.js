let userId = 1;
let schemeId = 2;
window.addEventListener("DOMContentLoaded", (e) => {
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
        const mainBody = document.querySelector(".tasks-main");
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
            await fetch(`/app/ploys/${ploy.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ployObj)
            })
            await displayPloys();
        })

        nameForm.append(nameInput);
        nameForm.append(renameButton);
        dataDiv.append(nameForm);
    }

    //Might need to modify for search
    //Not sure how userId will be used yet
    const displayPloys = async () => {
        //Steps
        //0. Check if on completed tab or not
        const activeTab = document.querySelector(".complete-tab.tab-active");
        const completed = (activeTab.innerHTML === "Completed");

        //1. Send GET request using params to query ploys
        const scheme = await fetch(`/app/schemes/${schemeId}`);
        const schemeObj = await scheme.json();
        //2. Empty out ploy-container
        const ployContainer = document.querySelector(".ploy-container");
        ployContainer.innerHTML = "";
        for(let i = 0; i < 10; i++){
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("ploy", "empty");
            ployContainer.append(emptyDiv);
        }
        //2. Call addPloyToContainer() for every returned ploy + create hidden data divs
        schemeObj.ploys.forEach((ploy) => {
            if(ploy.completed === completed){
                addPloyToContainer(ploy);
                createPloyDataDiv(ploy);
            }
        });
    }

    //Logic for Adding Ploys from Form
    const addPloyForm = document.querySelector(".add-ploy");
    addPloyForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const inputForm = document.querySelector("#add-ploy-field");
        const name = inputForm.value;
        const dueAt = null;

        const testPloy = {name, dueAt, schemeId: schemeId, completed: false};
        const postedPloy = await fetch('/app/ploys', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(testPloy)
        });
        const postPloy = await postedPloy.json();
        addPloyToContainer(postPloy.ploy);
        createPloyDataDiv(postPloy.ploy);
        inputForm.value = "";
    })

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

    //Event Listener for Deleting Ploys
    const deleteTaskButton = document.querySelector(".delete_ploy");
    deleteTaskButton.addEventListener("click", async (ev) => {
        //1. Get all Selected Ploys
        let selected = getSelectedPloys();

        //2. Send DELETE requests for ploys
        await Promise.all(selected.map(async (ploy) => {
            await fetch(`/app/ploys/${ploy.id}`, {
                method: "DELETE"
            })
        }));
        //3. Redisplay ploy table
        await displayPloys();
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
            await fetch(`/app/ploys/${ploy.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(ployObj)
            })
        }));
        //3. Redisplay ploy table
        await displayPloys();
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
            await displayPloys();
        })
    })

    //Logic for adding ploys from search list
    const searchBar = document.querySelector(".search");
    searchBar.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log(searchBar);
      const input = document.querySelector("#search-bar");
      const string = input.value;

      const ploys = await fetch(`/app/search/${string}`);
      const ploysObj = await ploys.json();

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
      //2. Call addPloyToContainer() for every returned ploy
      ploysObj.ploys.forEach((ploy) => {
         {
             console.log(ploy)
          addPloyToContainer(ploy);
        }
      });
    });

    displayPloys();
})
