// Task object constructor
function Task(name) {
    this.name = name;
    this.dateAdded = new Date().toLocaleString();
    this.dateEdited = null;
}

// Task Manager object
const taskManager = {
    tasks: [],
    
    // Add a new task
    addTask(taskName) {
        const newTask = new Task(taskName);
        this.tasks.push(newTask);
        this.displayTasks();
    },

    // Edit an existing task
    editTask(index, taskName) {
        this.tasks[index].name = taskName;
        this.tasks[index].dateEdited = new Date().toLocaleString(); // Set the edit date
        this.displayTasks();
    },

    // Delete a task
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.displayTasks();
    },

    // Display tasks
    displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Clear the list before re-rendering
        this.tasks.forEach((task, index) => {
            // Determine whether to show the "Added on" or "Edited on" date
            const dateInfo = task.dateEdited 
                ? `<span> Edited on: ${task.dateEdited}` 
                : `<span> Added on: ${task.dateAdded}`;
            const listItem = document.createElement('p');
            listItem.innerHTML = `
            <div class="listDivider">
            <div style="width: 40px;">
            <input type="checkbox">
            </div>
            <div style="flex: 1;">
                <span class="taskName"> ${task.name} </span>
                -
                <span class="dateAdded"> ${dateInfo}  </span>
            </div>
            <div style="width: 130px;">
                <button class="editButton" onclick="editTask(${index})">
                Edit
                </button>
                <button class="deleteButton" onclick="deleteTask(${index})">
                Delete
                </button>
            </div>
            </div>`;
            taskList.appendChild(listItem);
        });
    }
};

// Variables to keep track of editing state
let isEditing = false;
let currentTaskIndex = null;

// Function to handle adding or updating a task
function addOrEditTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

if (taskName === '') {
    alert("Please enter a valid task.");
    return;
}

if (isEditing) {
    // Update the task
    taskManager.editTask(currentTaskIndex, taskName);
    isEditing = false;
    currentTaskIndex = null;
    document.getElementById('addTask').innerText = 'Add Task'; // Change button text back to "Add Task"
} else {
    // Add a new task
    taskManager.addTask(taskName);
}

taskInput.value = ''; // Clear input field after adding/updating
}

// Function to delete a task
function deleteTask(index) {
    taskManager.deleteTask(index);
}

// Function to edit a task
function editTask(index) {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = taskManager.tasks[index].name; // Populate input field with task name
    isEditing = true;
    currentTaskIndex = index;
    document.getElementById('addTask').innerText = 'Update Task'; // Change button text to "Update Task"
}