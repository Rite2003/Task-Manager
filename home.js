//To display username on home page
let name = document.getElementById("name");
let savedName = localStorage.getItem("userName");
if (savedName) {
  name.innerHTML = `Hello, ${savedName}`;
}

// to display greeting
let greeting = document.getElementById("greeting");
if (name) {
  greeting.innerHTML = `Let's check your tasks for today, ${savedName}!`;
}

// press view task to see tasks
let viewTaskBtn = document.getElementById("viewTaskBtn");
let taskList = document.getElementById("taskList");
taskList.style.display = "none"; // hide task list initially
viewTaskBtn.addEventListener("click", () => {
  taskList.style.display = "block";
  viewTaskBtn.style.display = "none";
});

// when user click cross icon tas k list will be hidden
let closeBtn = document.querySelector(".box i");
closeBtn.addEventListener("click", () => {
  taskList.style.display = "none";
  viewTaskBtn.style.display = "block";
});

// Now setup the to-do list functionality
let inp = document.getElementById("newTask");
let btn = document.getElementById("addTaskBtn");
let ul = document.getElementById("tasks");
let editTodo = null;

// Optional: Allow adding task by pressing Enter key
inp.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btn.click(); // Trigger the button click event
  }
});

// Optional: If user clicks outside the input field while editing, reset the button
inp.addEventListener("blur", () => {
  if (btn.value === "Edit") {
    btn.value = "Add";
    inp.value = "";
  }
  // blur event occurs when the input field loses focus
});

// Add new task or edit existing task
btn.addEventListener("click", function () {
  if (inp.value.trim() === "") {
    alert("Please enter a task.");
    return; // Exit the function if input is empty
  }

  if (btn.value === "Edit") {
    // pass the old value to the function to edit in local storage
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inp.value;
    // previousElementSibling is used to access the <p> element before the Edit button
    btn.value = "Add";
    inp.value = "";
    return; // Exit the function after editing
  }

  let li = document.createElement("li");
  let p = document.createElement("p");
  p.innerHTML = inp.value;
  li.classList.add("add");
  console.log("New list item created:");

  // create Remove button
  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove");
  removeBtn.style.marginLeft = "10px";

  // create Edit button
  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  editBtn.style.marginLeft = "10px";

  li.appendChild(p);
  li.appendChild(editBtn);
  li.appendChild(removeBtn);
  ul.appendChild(li);

  // Save the task before clearing the input field
  saveLocalTodo(p.innerHTML.trim());
  inp.value = ""; // Clear input field
});

// Event delegation for Remove and Edit buttons
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove(); // Remove the list item
    deleteLocalTodos(e.target.parentElement); // Remove from local storage
  } else if (e.target.classList.contains("edit")) {
    inp.value = e.target.previousElementSibling.innerHTML; // what is e here? it is the button which is clicked
    inp.focus();
    btn.value = "Edit";
    editTodo = e;
  }
});

// function to save tasks in local storage can be added later

let saveLocalTodo = (todo) => {
  let todos = [];
  todos = JSON.parse(localStorage.getItem("todos")) || []; // Retrieve existing todos or initialize as empty array
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); // Convert array to JSON string before storing
};

// Function to get tasks from local storage and display them
let getLocalTodos = () => {
  let todos = [];
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = todo; // set the text of p element to the todo
    li.classList.add("add");
    console.log("New list item created from local storage:");

    // create Remove button
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.style.marginLeft = "10px";
    // create Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.style.marginLeft = "10px";
    li.appendChild(p);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
};

// Function to delete a specific task from local storage
let deleteLocalTodos = (todo) => {
  let todos = [];
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoText = todo.children[0].innerHTML; // Get the text of the parent li
  let todoIndex = todos.indexOf(todoText); // Find the index of the todo in the array
  todos.splice(todoIndex, 1); // Remove the specific todo
  localStorage.setItem("todos", JSON.stringify(todos));
  // Array functions : slice / splice
  console.log(todoIndex);
};

// Function to edit a specific task in local storage
let editLocalTodos = (todo) => {
  let todos = [];
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoIndex = todos.indexOf(todo); // Find the index of the todo in the array
  todos[todoIndex] = inp.value; // Update the specific todo
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Call the function to load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", getLocalTodos);
