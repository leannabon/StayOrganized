//GOAL: VIEW ALL TODOS BY USER 


//Global Scope Variables
const myURL = "http://localhost:8083/api/todos/byuser/1";
const userURL = "http://localhost:8083/api/users";
const dropdown = document.getElementById('userDD');
const toDoDisplay = document.getElementById('displayUserToDos');

//To console.log the array
async function getUsers(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('ERROR!', error);
    }
}
// getUsers(userURL);          //console.log user array from localhost API url  //No longer need to call out



function populateUserDD(url) {
    fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error("ERROR. Could't fetch API data.")
            }
        })
        .then(data => {
            data.forEach(user =>{
            const option = document.createElement('option');
            option.value = user.id;
            option.username = user.username;
            option.textContent = user.name;
            dropdown.appendChild(option);
            });
        });
}
populateUserDD(userURL);    //Populates DD by key-value name



function displayUserToDos() {
    let selectedUserID = dropdown.value;
    let content = '';
    fetch(`http://localhost:8083/api/todos/byuser/${selectedUserID}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(data => {
            data.forEach(item =>{
                content += `<div class="stickyNote p-5">
                <h1>${item.category}</h1>
                <h4>${item.deadline}</h4>
                <p>${item.description}</p>
                <p>Priority: ${item.priority}</p>
                <input type="checkbox">
                <label for="completion">Completed?</label>
              </div>
              <br>`;
            });
            toDoDisplay.innerHTML = content;
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });

}


dropdown.addEventListener('change', displayUserToDos);
displayUserToDos();
