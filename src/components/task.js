import { deleteTodo, updateTodo, doneEditTask, taskCompleted} from '../actions/domOperation.js';

let rootDiv = document.getElementById("root");




export const createTask = (item) => {
const listElement = document.createElement("li");
listElement.isEdited = false;
const listfield = document.createElement("input");
const delBtn = document.createElement("i");
const editBtn = document.createElement("i");
const doneEdit = document.createElement("i");
const completeBtn = document.createElement("i");
listElement.style.listStyle = "none";
doneEdit.style.display = "none";



listElement.setAttribute("id", item.id);

listfield.value = item.content;
// listfield.setAttribute("id", "listfield");
listfield.disabled = true;
listfield.addEventListener("change", () =>{ 
listElement.isEdited = true;
})

completeBtn.classList.add("far");
completeBtn.classList.add("fa-check-circle","fa-2x");
completeBtn.addEventListener('click', taskCompleted) 


if(item.isComplete)
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