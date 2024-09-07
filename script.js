const userTask = document.querySelector(".input-text");
const addBtn = document.querySelector(".addBtn");
const listContainer = document.querySelector(".list-container");
const deleteBtn = document.querySelector(".deleteBtn");
const totalTask = document.querySelector('.total-task');
let count = 0;

window.addEventListener('load', loadTasksFromLocalStorage);

// Add task button
function addTask() {
    let inputVal = userTask.value.trim();
    if (inputVal === "") {
        return;
    }

    // Check if task already exists
    const existingCheckbox = listContainer.querySelector(`#${inputVal}`);
    if (existingCheckbox) {
        return; // Prevent duplicates
    }

    const listItem = createListItem(inputVal);
    listContainer.append(listItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    userTask.value = "";
    updateCount();
}

// Create list item function
function createListItem(taskText, isChecked = false) {
    const listItem = document.createElement('li');
    listItem.className = "group";

    // Create input checkbox
    const newCheckbox = document.createElement('input');
    newCheckbox.type = "checkbox";
    newCheckbox.name = 'check';
    newCheckbox.id = taskText;
    newCheckbox.checked = isChecked;

    // Create label
    const newLabel = document.createElement('label');
    newLabel.setAttribute("for", taskText);
    newLabel.textContent = taskText;

    if (isChecked) {
        newLabel.innerHTML = `<s>${taskText}</s>`;
    }

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = "removeBtn";
    removeBtn.addEventListener('click', () => {
        listItem.remove();
        saveTasksToLocalStorage(); // Update local storage after removal
        updateCount();
    });

    // Append elements to list item
    listItem.append(newCheckbox);
    listItem.append(newLabel);
    if (isChecked) {
        listItem.append(removeBtn);
    }

    // Event listener for checkbox changes
    newCheckbox.addEventListener("change", function (e) {
        const checkbox = e.target;
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (checkbox.checked) {
            label.innerHTML = `<s>${checkbox.id}</s>`;
            listItem.append(removeBtn);
        } else {
            label.innerHTML = checkbox.id;
            removeBtn.remove();
        }
        saveTasksToLocalStorage(); // Update local storage when task is checked/unchecked
    });

    return listItem;
}

// Event listener for add button
addBtn.addEventListener("click", addTask);

// Event listener for Enter key
userTask.addEventListener("keypress", function (e) {
    if (e.code === "Enter") {
        addTask();
    }
});

// Delete all tasks
deleteBtn.addEventListener("click", function () {
    listContainer.innerHTML = "";
    localStorage.removeItem('tasks'); // Clear local storage
    updateCount();
});

// Update count of total tasks
function updateCount() {
    count = listContainer.getElementsByClassName('group').length;
    totalTask.innerText = `${count} Total items`;
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    const listItems = listContainer.querySelectorAll('.group');
    listItems.forEach(item => {
        const checkBox = item.querySelector('input[type="checkbox"]');
        tasks.push({ task: checkBox.id, isChecked: checkBox.checked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskData => {
        const listItem = createListItem(taskData.task, taskData.isChecked);
        listContainer.append(listItem);
    });
    updateCount();
}
