
const todolist = [];
const todolistElement = document.querySelector("#myUL");
const addButton = document.querySelector("#add_button");
const myInput = document.querySelector("#myInput");


// const addToLocalStorage = () => {
//     localStorage.setItem("todolist",JSON.stringify(todolist));
//     displayTodo();
// }
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
        // addToLocalStorage();
    }
}
addButton.addEventListener("click", addTodo);
myInput.addEventListener("keydown", function(e) {
    if(e.keyCode==13){
        addTodo();
    }
});

// const getFromLocalStorage = () => {
//     const reference = localStorage.getItem("todolist");
//     if(reference)
//     {
//         displayTodo();
//     }
// }


const deleteItem = (todoId) =>{
    todolist.splice(todolist.findIndex((elememt)=> elememt.id == todoId),1);
    displayTodo();
}
// addToLocalStorage();

const doneTodo = (todoId) => {
    const selectedTodo = todolist.findIndex((elememt) => elememt.id == todoId);

    todolist[selectedTodo].isDone 
    ? (todolist[selectedTodo].isDone = false) 
    :  (todolist[selectedTodo].isDone = true);
    displayTodo(); 
    // addToLocalStorage();
}

// const updateTodo = (e) => {
//   const pare=e.target.parentElement.children[1].textContent;
//     let editedtxt = document.getElementById("task").value=pare;
//     // console.log(x);
//     // return x;

// }


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
       if(!item.isDone){
        listfield.disabled = false;
        // listfield.value = item.value;
        item.todotext = listfield.value;
         }
       
      });
 
    //   getFromLocalStorage();

    listElement.appendChild(doneBtn);
    listElement.appendChild(listfield);
    todolistElement.appendChild(listElement);
    listElement.appendChild(delBtn);
    listElement.appendChild(editBtn);
  });
}







