 // Fetch users from the API and populate the dropdown
 fetch('http://localhost:8083/api/users')
 .then(response => response.json())
 .then(users => {
   const userDropdown = document.getElementById('user');
   users.forEach(user => {
     const option = document.createElement('option');
     option.value = user.id;
     option.text = user.name;
     userDropdown.appendChild(option);
   });
 })
 .catch(error => {
   console.error('Error fetching users:', error);
 });

// Fetch categories from the API and populate the dropdown
fetch('http://localhost:8083/api/categories')
 .then(response => response.json())
 .then(categories => {
   const categoryDropdown = document.getElementById('category');
   categories.forEach(category => {
     const option = document.createElement('option');
     option.value = category.id;
     option.text = category.name;
     categoryDropdown.appendChild(option);
   });
 })
 .catch(error => {
   console.error('Error fetching categories:', error);
 });

// Function to add a todo item
function addTodo() {
 const user = document.getElementById('user').value;
 const category = document.getElementById('category').value;
 const priority = document.getElementById('priority').value;
 const description = document.getElementById('description').value;
 const deadline = document.getElementById('deadline').value;

 const todo = {
   userid: user,
   category,
   description,
   deadline,
   priority,
   completed: false
 };

 // Make a POST request to the API to save the todo item
 fetch('http://localhost:8083/api/todos', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(todo)
 })
   .then(response => response.json())
   .then(newTodo => {
     // Clear the input fields
     document.getElementById('user').value = '';
     document.getElementById('category').value = '';
     document.getElementById('priority').value = 'Low';
     document.getElementById('description').value = '';
     document.getElementById('deadline').value = '';

     // Display the new todo item
     displayTodoItem(newTodo);
   })
   .catch(error => {
     console.error('Error adding todo:', error);
   });
}

// Function to display a todo item
function displayTodoItem(todo) {
 const todoList = document.getElementById('todo-list');

 const todoItem = document.createElement('div');
 todoItem.classList.add('todo-item');
 todoItem.innerHTML = `
   <h3>User: ${todo.user.name}</h3>
   <p>Category: ${todo.category}</p>
   <p>Priority: ${todo.priority}</p>
   <p>Description: ${todo.description}</p>
   <p>Deadline: ${todo.deadline}</p>
 `;

 todoList.appendChild(todoItem);
}

// Event listener for form submission
document.getElementById('todo-form').addEventListener('submit', function(event) {
 event.preventDefault();
 addTodo();
});

// Fetch all todos from the API and display them on page load
fetch('http://localhost:8083/api/todos')
 .then(response => response.json())
 .then(todos => {
   todos.forEach(todo => {
     displayTodoItem(todo);
   });
 })
 .catch(error => {
   console.error('Error fetching todos:', error);
 });