'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todo')) || [];

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';


  todoData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
    <span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
      <button class="todo-remove"></button>
      <button class="todo-complete"></button>
    </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComlete = li.querySelector('.todo-complete');
    
     btnTodoComlete.addEventListener('click', () => {
       item.completed = !item.completed;
       render();
     })
     const todoRemove = li.querySelector('.todo-remove');

     todoRemove.addEventListener('click', (e) => {
      let target = e.target;

      target = li.remove(); 
      target = localStorage.removeItem('todo');

     });

     localStorage.setItem('todo', JSON.stringify(todoData))
  });
};

todoControl.addEventListener('submit', (e) => {
  
  e.preventDefault();

  if (headerInput.value === null || headerInput.value === '') {

    alert('Поле "Какие планы?" не должно быть пустым');

  } else {
    
  const newTodo = {
        value: headerInput.value,
        completed: false
      };

      todoData.push(newTodo)

      render();
  }
  headerInput.value = '';
});

render();