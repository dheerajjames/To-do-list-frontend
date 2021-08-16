
import { getTodos} from './actions/domOperation.js'
import { addTodo} from './actions/domOperation.js'
import "../styles/style.css";

window.onload = function () {
    getTodos();

  };
  window.addEventListener("offline", () => {
    console.log("I am offline.");

  });
  
  todo.addEventListener('submit', addTodo);



