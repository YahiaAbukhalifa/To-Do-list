let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToTasks(input.value);
    input.value = "";
  }
};

tasksDiv.addEventListener("click" , (e) =>{
  if (e.target.classList.contains("delete")){
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }

  if(e.target.classList.contains("task")){
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
})


function addTaskToTasks(taskTitle) {
  const task = {
    id: Date.now(),
    title: taskTitle,
    completed: false,
  };

  arrayOfTasks.push(task);
  addTasksTopage(arrayOfTasks);
  addDataToLocal(arrayOfTasks);
  console.log(arrayOfTasks);
  console.log(JSON.stringify(arrayOfTasks));
}
function addTasksTopage(Task) {
  tasksDiv.innerHTML = "";
  Task.forEach((element) => {
    let div = document.createElement("div");
    div.className = "task";

    if (Task.completed) {
      div.className = "task done";
    }
    document.body.classList.add("space-animation");
    div.setAttribute("data-id", element.id);
    div.appendChild(document.createTextNode(element.title));
    tasksDiv.appendChild(div);
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
  });
}
function addDataToLocal(addToLocal) {
  window.localStorage.setItem("tasks", JSON.stringify(addToLocal));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksTopage(tasks);
  }
}

function deleteTaskWith(taskID){
  for (let i = 0 ; i < arrayOfTasks.length ; i++){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskID);
    addDataToLocal(arrayOfTasks);
  }
}

function toggleStatusTaskWith(taskID){
  for (let i = 0 ; i < arrayOfTasks.length ; i++){
    if(arrayOfTasks[i].id == taskID){
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocal(arrayOfTasks);
}

function deleteAll(){
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
}
