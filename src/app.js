
import { getTodos} from './actions/domOperation.js'
import { addTodo} from './actions/domOperation.js'
window.onload = function () {
    getTodos();
  };
  
  todo.addEventListener('submit', addTodo);



