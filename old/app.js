
let todolist = [];
const todolistElement = document.querySelector("#myUL");
const addButton = document.querySelector("#add_button");
const myInput = document.querySelector("#myInput");


window.onload = function() {
  previousArr = JSON.parse(localStorage.getItem('tasks'));
  if(previousArr != null){
      previousArr.forEach((item) => {
        displayTodo();
      });
      todolist = [...previousArr];
      previousArr = [];
  }
  displayTodo();
  return ;
};

const setlocalStorage = () => {
  localStorage.setItem('tasks',JSON.stringify(todolist));
}

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
        // setlocalStorage();
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
    setlocalStorage();

    displayTodo();
}

const doneTodo = (todoId) => {
    const selectedTodo = todolist.findIndex((elememt) => elememt.id == todoId);
    setlocalStorage();

    todolist[selectedTodo].isDone 
    ? (todolist[selectedTodo].isDone = false) 
    :  (todolist[selectedTodo].isDone = true);
    displayTodo(); 
}

const updateTodo = (todoId) => {
  const selectedTodo = todolist.findIndex((elememt) => elememt.id == todoId);
  setlocalStorage();

 
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
    delBtn.classList.add("fa-trash-alt","fa-2x");
    delBtn.setAttribute("data-id", item.id);


    editBtn.classList.add("far");
    editBtn.classList.add("fa-edit","fa-2x");
    editBtn.setAttribute("data-id", item.id);


    doneBtn.classList.add("far");
    doneBtn.classList.add("fa-check-circle","fa-2x");
    doneBtn.setAttribute("data-id", item.id);
   

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    if (item.isDone) {
      listElement.classList.add("checked");
      listfield.style.textDecoration = "line-through";
    }

    doneBtn.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    editBtn.addEventListener("click", function (e) {
      const editId = e.target.getAttribute("data-id");
      updateTodo(editId);
       if(!item.isDone){
        listfield.disabled = !listfield.disabled;
        item.todotext = listfield.value;
         }
       
      });
 

    listElement.appendChild(doneBtn);
    listElement.appendChild(listfield);
    todolistElement.appendChild(listElement);
    listElement.appendChild(delBtn);
    listElement.appendChild(editBtn);
  });
  setlocalStorage();

}







