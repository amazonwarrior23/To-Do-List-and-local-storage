// saving to local storage via an array
const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
//console.log("In Local Storage:", itemsArray);


document.querySelector("#addBtn").addEventListener("click", () => {
   resetInputValue();
})

//event listener for enter keypress
document.querySelector("#addItem").addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        resetInputValue();
    } 
})

function resetInputValue(){
    let inputValue = document.getElementById("addItem").value;
    if (inputValue === "") {
        alert("Please enter a task");
    } else {
        const item = document.querySelector("#addItem");
        createItem(item);
    }
}

function displayDate(){
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML = date[0] + ". " + date[1] + " " + date[2] + ", " + date[3];
    //console.log("Date:", date);
}    

window.onload = function(){
    displayDate();
    displayItems();
}

//new function from web dev tutorials vid
function displayItems(){
    let items = "";
    for(let i = 0; i < itemsArray.length; i++){
        items += `<div class="item">
                        <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                            <div class="edit-controller">
                                <i class="fa-solid fa-pen-to-square editBtn"></i>
                                <i class="fa-regular fa-trash-can deleteBtn"></i>
                            </div>
                        </div>
                        <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>`
    }
    
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeleteListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
    
    document.getElementById("addItem").value = "";
}

//getting access to each delete button. the forEach adds event listeners to each button
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { 
            deleteItem(i); 
        })
    })
}

//should make cancel and save buttons visible and edit text
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => { 
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    })
}

function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        })
    })
}

function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
        })
    })
}

function createItem(item){
    itemsArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    //location.reload();
    displayItems();
}

function updateItem(text, i){
    itemsArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemsArray));
}

//to delete each item from the items array and update local storage
function deleteItem(i){
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    //location.reload();
    displayItems();
}