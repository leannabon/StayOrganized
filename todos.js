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
        console.log(data);
            data.forEach(item =>{

                content += `<div class="stickyNote p-5">
                <h4>${item.deadline}</h4>
                <p>${item.description}</p>
                <a name="" id="" class="btn btn-light btn-outline-dark" href="todo_details.html?id=${item.id}" target="_blank" role="button">See Details</a>
                </div>
              <br>`;
                //   <p>Status: ${item.completed ? '✅' : '❌'}</p>
                //The innerHTML for the Status uses a conditional ternary operator to check id the key-value pair is true/false and will output based on the latter.
            });
            toDoDisplay.innerHTML = content;
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}


dropdown.addEventListener('change', displayUserToDos);
