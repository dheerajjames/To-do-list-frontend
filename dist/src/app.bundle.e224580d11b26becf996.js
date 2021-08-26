/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/apiCalls/taskAPI.js

const apiCall = async (url, taskObj = {}) => {
    try{
   const response = await fetch(url, taskObj);
   const data = await response.json();
   const taskData = await data.data;

   return taskData;
    }
    catch(err){
        console.log(err);
    }
  }


;// CONCATENATED MODULE: ./src/components/task.js


let rootDiv = document.getElementById("root");




const createTask = (item) => {
const listElement = document.createElement("li");
listElement.isEdited = false;
const listfield = document.createElement("input");
const delBtn = document.createElement("i");
const editBtn = document.createElement("i");
const doneEdit = document.createElement("i");
const completeBtn = document.createElement("i");
listElement.style.listStyle = "none";
doneEdit.style.display = "none";



listElement.setAttribute("id", item.taskId);

listfield.value = item.content;
// listfield.setAttribute("id", "listfield");
listfield.disabled = true;
listfield.addEventListener("change", () =>{ 
listElement.isEdited = true;
})

completeBtn.classList.add("far");
completeBtn.classList.add("fa-check-circle","fa-2x");
completeBtn.addEventListener('click', taskCompleted) 


if(item.iscomplete)
    {
    // console.log("listfield.isComplete");
    editBtn.style.display = "none";
    doneEdit.style.display = "none";
    listElement.style.backgroundColor = "grey";
    listfield.style = "text-decoration: line-through";
    }


delBtn.classList.add("far");
delBtn.classList.add("fa-trash-alt","fa-2x");
delBtn.addEventListener('click', deleteTodo);

editBtn.classList.add("far");
editBtn.classList.add("fa-edit","fa-2x");
editBtn.addEventListener('click', updateTodo) 

doneEdit.classList.add("far");
doneEdit.classList.add("fa-thumbs-up","fa-2x");
doneEdit.addEventListener('click', doneEditTask) 

listElement.appendChild(completeBtn)
listElement.appendChild(listfield);
listElement.appendChild(delBtn);
listElement.appendChild(editBtn);
listElement.appendChild(doneEdit);
rootDiv.appendChild(listElement);
}
;// CONCATENATED MODULE: ./src/actions/domOperation.js




// const url = "https://todo-list-app-backend-7.herokuapp.com/tasks";
const url = "http://127.0.0.1:3000/tasks";



const getTodos = async () => {
     let allTasks = await apiCall(`${url}`);
     console.log(allTasks);
    allTasks.forEach((item) => {
        createTask(item);
       
    });
    
}


const addTodo = async (event) => {
   
    event.preventDefault();
    let taskField = document.getElementById("taskField");
    let inputValue = taskField.value;
    taskField.value = "";
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    let taskObj = {
        method: 'POST',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: ""}),
        headers: {
            "Content-Type": "application/json"
        } 
    }
   
        const addTask = await apiCall(`${url}`, taskObj);
        createTask(addTask);
  
    console.log(addTask);
}


const deleteTodo = (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    let taskObj = {
        method: 'DELETE'
    }
   
    const id = e.target.parentElement.id;
    // console.log(id);
    const deleteTask = document.getElementById(id);
    console.log(deleteTask);
    apiCall(`${url}/${id}`, taskObj);
    deleteTask.remove();
}




const updateTodo = (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    const enableInput = e.target.parentElement.childNodes[1];
 
        enableInput.disabled = false;
        e.target.parentElement.childNodes[3].style.display = 'none';
        e.target.parentElement.childNodes[4].style.display = 'unset';   
    
    
}


const doneEditTask = async (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    const enableInput = e.target.parentElement.childNodes[1];
    const parentelem = e.target.parentElement;
    const id = e.target.parentElement.id;
    let inputValue = enableInput.value;
    console.log(parentelem);
    if(parentelem.isEdited)
    {
    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            iscompleted: false
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    }
    console.log(id);
     await apiCall(`${url}/${id}`, taskObj);
    //  console.log("api called");
     parentelem.isEdited=false;
}
     enableInput.disabled = true;
     e.target.parentElement.childNodes[3].style.display = 'unset';
     e.target.parentElement.childNodes[4].style.display = 'none';


}


const taskCompleted = async (e) => {
    const enableInput = e.target.parentElement.childNodes[1];
    // console.log(e);
    const editDisabled = e.target.parentElement.childNodes[3];
    const doneDisabled = e.target.parentElement.childNodes[4];
    const id = e.target.parentElement.id;
    // editDisabled.disabled = true;
    editDisabled.style.display = 'none';
    doneDisabled.style.display = 'none';
    // doneDisabled.disabled = true;
    enableInput.style.textDecoration = "line-through";
    e.target.parentElement.style.backgroundColor = "grey";
    let inputValue = enableInput.value;
    // console.log(inputValue);

    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            iscomplete: true
        }),
        headers: {
            "Content-Type": "application/json"
        } 

    }
    await apiCall(`${url}/${id}`, taskObj);

}
;// CONCATENATED MODULE: ./src/app.js





window.onload = function () {
    getTodos();

  };
  window.addEventListener("offline", () => {
    console.log("I am offline.");

  });
  
  todo.addEventListener('submit', addTodo);




/******/ })()
;