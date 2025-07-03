// This loads stored data or uses the default list
const storedTodoList = localStorage.getItem('todoList');
let todoList = storedTodoList ? JSON.parse(storedTodoList) : [
  { text: 'Complete APP Assignment', dueDate: '2023-08-15', priority: 'High' },
  { text: 'Call boss', dueDate: '2023-08-24', priority: 'High' },
  { text: 'Organise Kitchen', dueDate: '2023-09-21', priority: 'Low' },
  { text: 'Pay bills', dueDate: '2023-08-21', priority: 'Medium' },
  { text: 'Buy Christmas presents', dueDate: '2023-12-10', priority: 'Low' },
];

// This function renders the to-do list
function renderTodoList(items) {
  const todoListElement = document.getElementById('todoList');
  todoListElement.innerHTML = '';

  // This creates a list element for each to-do item
  items.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.text} - Due: ${item.dueDate}, Priority: ${item.priority}`;
      
      // This creates a delete button for each list item
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteTodoItem(index));

      li.appendChild(deleteButton);
      todoListElement.appendChild(li);
  });
}

// This function sorts the list by the due date
function sortByDueDate() {
  const sortedList = [...todoList].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  renderTodoList(sortedList);
}

// This function sorts the list by priority
function sortByPriority() {
  const sortedList = [...todoList].sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  renderTodoList(sortedList);
}

// This is the drop down function for the sort options
document.getElementById('sortOption').addEventListener('change', function() {
  const selectedOption = this.value;
  if (selectedOption === 'dueDate') {
      sortByDueDate();
  } else if (selectedOption === 'priority') {
      sortByPriority();
  }
});

// This is the function to add a new to-do item
document.getElementById('addButton').addEventListener('click', function() {
  const newTodo = document.getElementById('newTodo').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  if (newTodo && dueDate && priority) {
      todoList.push({ text: newTodo, dueDate, priority });
      renderTodoList(todoList);
      document.getElementById('newTodo').value = '';
      document.getElementById('dueDate').value = '';
      document.getElementById('priority').value = 'High';

      // // This saves the updated list to local storage
      localStorage.setItem('todoList', JSON.stringify(todoList));
  }
});

// Function to delete a specific to-do item
function deleteTodoItem(index) {
  todoList.splice(index, 1);
  renderTodoList(todoList);

  // This saves the updated list to local storage
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Initial render
renderTodoList(todoList);
