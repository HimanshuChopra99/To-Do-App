const userTask = document.querySelector(".input-text");
const addBtn = document.querySelector(".addBtn");
const listContainer = document.querySelector(".list-container");
const deleteBtn = document.querySelector(".deleteBtn");
const totalTask = document.querySelector('.total-task');
let count = 0;

//add task button
function addTask(){
    let inputVal = userTask.value;
    if (inputVal === "") {
        return;
    }
    //check if task alredy exists
    const existingCheckbox = listContainer.querySelector(`#${inputVal}`)
    if(existingCheckbox){
        return; //prevent from dublicate
    }

    const listItem = document.createElement('li');
    listItem.className = "group";

    // Create input
    const newCheckbox = document.createElement('input');
    newCheckbox.type = "checkbox";
    newCheckbox.name = 'check';
    newCheckbox.id = inputVal;

    // Create label
    const newLabel = document.createElement('label');
    newLabel.setAttribute("for", inputVal);
    newLabel.textContent = inputVal;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = "removeBtn";
    removeBtn.addEventListener('click', () => {
        listItem.remove();
        updateCount();
    })

    // Append elements to li
    listItem.append(newCheckbox);
    listItem.append(newLabel);
    listContainer.append(listItem);

    // Event listener for checkbox changes
    newCheckbox.addEventListener("change", function (e) {
        const checkbox = e.target;
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (checkbox.checked) {
            label.innerHTML = `<s>${checkbox.id}</s>`; // Add strikethrough if checked
            listItem.append(removeBtn);
        } else {
            label.innerHTML = checkbox.id; // Remove strikethrough if unchecked
            removeBtn.remove();
        }
    });

    userTask.value = "";
    updateCount();
}


//Event listener for add button
addBtn.addEventListener("click",addTask);
//Event listner for Enter Key
userTask.addEventListener("keypress", function(e){
    if(e.code == "Enter"){
        addTask();
    }
});

//Delete all task
deleteBtn.addEventListener("click", function(){
    listContainer.innerHTML = ""
    updateCount();
})

//update count of total task
function updateCount(){
    count = listContainer.getElementsByClassName('group').length;
    totalTask.innerText = `${count} Total items`;
}
