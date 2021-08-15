import { apiCall } from "../apiCalls/taskAPI.js";
import { createTask } from "../components/task.js";

const url = "http://127.0.0.1:5000/tasks";

export const getTodos = async () => {
     let allTasks = await apiCall(`${url}`);
     console.log(allTasks);
    allTasks.forEach((item) => {
        createTask(item);
       
    });
    
}


export const addTodo = async (event) => {
    event.preventDefault();
    let taskField = document.getElementById("taskField");
    let inputValue = taskField.value;
    taskField.value = "";
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
}


export const deleteTodo = (e) => {
    let taskObj = {
        method: 'DELETE'
    }
    const id = e.target.parentElement.id;
    console.log(id);
    const deleteTask = document.getElementById(id);
    apiCall(`${url}/${id}`, taskObj);
    deleteTask.remove();
}




export const updateTodo = (e) => {
    const enableInput = e.target.parentElement.childNodes[1];
    enableInput.disabled = false;
    // e.target.parentElement.childNodes[3].style.display = 'none';

}

export const doneEditTask = async (e) => {
    const enableInput = e.target.parentElement.childNodes[1];
    const parentelem = e.target.parentElement;
    const id = e.target.parentElement.id;
    let inputValue = enableInput.value;
    if(parentelem.isEdited)
    {
    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            isComplete: false
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    }
     await apiCall(`${url}/${id}`, taskObj);
    //  console.log("api called");
     parentelem.isEdited=false;
}
     enableInput.disabled = true;
    //  e.target.parentElement.childNodes[3].style.display = 'unset';

}


export const taskCompleted = async (e) => {
    const enableInput = e.target.parentElement.childNodes[1];
    console.log(e);
    const editDisabled = e.target.parentElement.childNodes[3];
    const doneDisabled = e.target.parentElement.childNodes[4];
    const id = e.target.parentElement.id;
    editDisabled.disabled = true;
    doneDisabled.disabled = true;
    enableInput.style.textDecoration = "line-through";
    e.target.parentElement.style.backgroundColor = "grey";
    let inputValue = enableInput.value;
    // console.log(inputValue);

    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            isComplete: true
        }),
        headers: {
            "Content-Type": "application/json"
        } 

    }
    await apiCall(`${url}/${id}`, taskObj);

}