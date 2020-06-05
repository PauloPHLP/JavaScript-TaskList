//Defining UI variables.
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Calling a function to load all event listeners.
loadEventListeners();

//Function to load all event listeners.
function loadEventListeners() {
    //DOM load event.
    document.addEventListener('DOMContentLoaded', getTasks);
    //Adding a new task.
    form.addEventListener('submit', addTask);
    //Removing a task.
    taskList.addEventListener('click', removeTask);
    //Clear all tasks of the list.
    clearBtn.addEventListener('click', clearTasks);
    //Filter the tasks.
    filter.addEventListener('keyup', filterTasks);
}

//Function to get tasks from local storage.
function getTasks() {
    let tasks = checkLocalStorage();

    tasks.forEach(function(task) {
        //Creating a li element.
        const li = document.createElement('li');
        //Adding a classe to li.
        li.className = 'collection-item';
        //Creating a text node and appending it to li.
        li.appendChild(document.createTextNode(task));
        //Creating the delete button.
        const deleteButton = document.createElement('a');
        //Adding a class to deleteButton.
        deleteButton.className = 'delete-item secondary-content';
        //Adding an icon to deleteButton.
        deleteButton.innerHTML = '<i class="fa fa-remove"></i>';
        //Appending deleteButton to li.
        li.appendChild(deleteButton);
        //Appending li to ul.
        taskList.appendChild(li);
    });
}

//Function to add a new task to the list.
function addTask(e) {
    //Checking if the task input is empty.
    if (taskInput.value === '') {
        alert("Please insert a new task!");
    } else {
        //Calling a function to add a new task. 
        addNewItemToTheList();
    }

    e.preventDefault();
}

//Function to add a new item.
function addNewItemToTheList() {
    //Creating a li element.
    const li = document.createElement('li');
    //Adding a classe to li.
    li.className = 'collection-item';
    //Creating a text node and appending it to li.
    li.appendChild(document.createTextNode(taskInput.value));
    //Creating the delete button.
    const deleteButton = document.createElement('a');
    //Adding a class to deleteButton.
    deleteButton.className = 'delete-item secondary-content';
    //Adding an icon to deleteButton.
    deleteButton.innerHTML = '<i class="fa fa-remove"></i>';
    //Appending deleteButton to li.
    li.appendChild(deleteButton);
    //Appending li to ul.
    taskList.appendChild(li);
    //Calling a funtion to store task in local storage.
    storeTaskInLocalStorage(taskInput.value);    
    //Cleaning the task input.
    taskInput.value = '';
}

//Function to store a new task in the local storage.
function storeTaskInLocalStorage(task) {
    let tasks = checkLocalStorage();

    //Adding a new task to tasks list.
    tasks.push(task);

    //Saving the tasks lists on the local storage.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Function to remove a task of the list.
function removeTask(e) {
    //Checks if the target element is the delete button.
    if(e.target.parentElement.classList.contains('delete-item')) {
        //Confirms if the user really wants to delete the item of the list.
        if(confirm('Are you sure?')){
            //Removing a task from the list.
            e.target.parentElement.parentElement.remove();

            //Calling a function to remove a task from local storage.
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Function to remove a task from local storage.
function removeTaskFromLocalStorage(taskItem) {
    let tasks = checkLocalStorage();

    //Checking all elements on the tasks list and removing them.
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
    });
    
    //Setting up the new tasks list.
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Function to clear all tasks of the list.
function clearTasks() {
    //Removing each item of the list at the time.
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //Calling a function to remove all tasks from local storage.
    clearTasksFromLocalStorage();
}

//Function to remove all tasks from local storage.
function clearTasksFromLocalStorage() {
    //Removing everything from the local storage.
    localStorage.clear();
}

//Function to filter the tasks.
function filterTasks(e) {
    //Turning the filter into a lower case.
    const text = e.target.value.toLowerCase();

    //Selecting all finded results.
    document.querySelectorAll('.collection-item').forEach(function(task){
        //Selecting the text of the results.
        const item = task.firstChild.textContent;
        //Check if there is any result.
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

//Function to check if the local storage is empty.
function checkLocalStorage() {
    let tasks;

    //Checking is local storage already has an item called 'tasks'.
    if (localStorage.getItem('tasks') === null) {
        //If it don't have an item called 'tasks' sets it to an empty array.
        tasks = [];
    } else {
        //If it has an item called 'tasks' takes that item from storage and then passes it to 'tasks' variable.
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}