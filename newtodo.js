// Fetch and display categories
        fetch('http://localhost:8083/api/categories')
            .then(response => response.json())
            .then(categories => {
                const categoriesList = document.getElementById('categoriesList');
                categories.forEach(category => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = category.name;
                    categoriesList.appendChild(listItem);
                });
            });

        // fetch and display all ToDos
        fetch('http://localhost:8083/api/todos')
            .then(response => response.json())
            .then(todos => {
                const todosList = document.getElementById('todosList');
                todos.forEach(todo => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = todo.description;
                    todosList.appendChild(listItem);
                });
            });

        // populate user dropdown from API
        fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(users => {
                const userSelect = document.getElementById('userSelect');
                users.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.innerHTML = user.name;
                    userSelect.appendChild(option);
                });
            });

        // handle form submission
        document.getElementById('todoForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);

            fetch('http://localhost:8083/api/todos', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(todo => {
                console.log('ToDo added:', todo);
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });