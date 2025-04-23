let  todoList=JSON.parse(localStorage.getItem('todoList')) || [];

 
 updateTodo();

function addTodo(){
 const inputElement= document.querySelector('.js-input');
  const dateElement= document.querySelector('.js-time');
 const name=inputElement.value;
 const date=dateElement.value;
 todoList.push({
              name:name,
              dueDate:date
            });
            console.log(todoList);
 inputElement.value='';
 localStorage.setItem('todoList',JSON.stringify(todoList));
  updateTodo();
}

function updateTodo(){
  const todoListElement=document.querySelector('.js-task-list');
  todoListElement.innerHTML='';
  let todoHtml='';

  todoList.forEach((todoObject,index)=>{
    const {name,dueDate} = todoObject;
    const i=index;
    todoHtml+= `<div class="task">
          <div class="task-info">
            <label class="todo-name">${name}</label>
            <p class="colored">${dueDate}</p>
          </div>
        <button onclick="
        todoList.splice(${i},1);
        updateTodo();
        " class="delete-btn">🗑️</button>
            </div>`
});
  localStorage.setItem('todoList',JSON.stringify(todoList));
  todoListElement.innerHTML=todoHtml;
}