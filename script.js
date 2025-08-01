let  todoList=JSON.parse(localStorage.getItem('todoList')) || [];

const inputElement= document.querySelector('.js-input');
  const dateElement= document.querySelector('.js-date');
  const timeElement= document.querySelector('.js-time');
  
  const checkboxElement = document.querySelector('.js-checkbox');
  const todoNameElement= document.querySelector('.todo-name');
  const editButtonElement = document.querySelector('.edit-btn');

 
 updateTodo();

function addTodo(){
 const name=inputElement.value;
 const date=dateElement.value;
 const time=timeElement.value;

    if(name.trim() === '' || !date || !time){
        alert('Please fill all fields');
        return;
    }
 todoList.push({
              name:name,
              dueDate:date,
              dueTime:time,
              completed: false,
            });
 inputElement.value='';
 localStorage.setItem('todoList',JSON.stringify(todoList));
  updateTodo();
}

function updateTodo(){
  const todoListElement=document.querySelector('.js-task-list');
  todoListElement.innerHTML='';
  let todoHtml='';

  todoList.forEach((todoObject,index)=>{
    const {name,dueDate,dueTime,completed} = todoObject;
    const i=index;
    todoHtml+= `<div class="task ${completed ? 'completed' : ''}">
          <div class="task-info">
            <label class="todo-name ${completed ? 'hide':''}">${name}</label>

            <div class="rap">
              <span class="colored ${completed ? 'hide1':''}">${dueDate}</span>
              <span class="colored1 ${completed ? 'hide1':''}">${dueTime}</span>
            </div>

          </div>
        <input type="checkbox" class="complete-checkbox" ${completed ? 'checked' : ''} onclick="trackComplete(${index});">
        <button class="edit-btn" onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})" class="delete-btn">🗑️</button>
        </div>`
});
  localStorage.setItem('todoList',JSON.stringify(todoList));
  todoListElement.innerHTML=todoHtml;
}

function editTask(index){
  const currentTask=todoList[index];

  const newName= prompt('Edit task name:', currentTask.name);
  const newDate= prompt('Edit due date (YYYY-MM-DD):', currentTask.dueDate);
  const newTime=prompt('Edit due time (HH:MM):', currentTask.dueTime);

   if (newName !== null && newName.trim() !== '') {
        currentTask.name = newName.trim();
    }
    if (newDate !== null && newDate !== '') {
        currentTask.dueDate = newDate;
    }
    if (newTime !== null && newTime !== '') {
        currentTask.dueTime = newTime;
    }
    localStorage.setItem('todoList',JSON.stringify(todoList));
    updateTodo();
}

function trackComplete(index){
  todoList[index].completed= !todoList[index].completed;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  updateTodo();
}

function deleteTask(index){
  todoList.splice(index,1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
    updateTodo();
}