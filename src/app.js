
const todolist = [];
const todolistElement = document.querySelector("#myUL");
const addButton = document.querySelector("#add_button");
const myInput = document.querySelector("#myInput");



const addTodo = () => {
    const todotext = myInput.value;
    if (todotext == "") {
        alert("You did not enter anything");
    }
    else{
        const todoObject = {
            id : todolist.length,
            todotext : todotext,
            isDone: false,
        };

        todolist.push(todoObject);
        displayTodo();
    }
}
addButton.addEventListener("click", addTodo);
myInput.addEventListener("keydown", function(e) {
    if(e.keyCode==13){
        addTodo();
    }
});



const deleteItem = (todoId) =>{
    todolist.splice(todolist.findIndex((elememt)=> elememt.id == todoId),1);
    displayTodo();
}

const displayTodo = () => {
    todolistElement.innerHTML = "";
  document.querySelector("#myInput").value = "";

  todolist.forEach((item) => {
    const listElement = document.createElement("li");
    const listfield = document.createElement("input");
    const delBtn = document.createElement("i");
    const editBtn = document.createElement("i");
    const doneBtn = document.createElement("i");
    
    listfield.value = item.todotext;
    listfield.setAttribute("data-id", item.id);
    listfield.disabled = true;

    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-alt");
    delBtn.setAttribute("data-id", item.id);


    editBtn.classList.add("far");
    editBtn.classList.add("fa-edit");

    doneBtn.classList.add("far");
    doneBtn.classList.add("fa-check-circle");
   

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });
    listElement.appendChild(doneBtn);
    listElement.appendChild(listfield);
    todolistElement.appendChild(listElement);
    listElement.appendChild(delBtn);
    listElement.appendChild(editBtn);
  });
}
