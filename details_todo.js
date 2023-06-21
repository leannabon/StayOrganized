//URL queryString
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const detailsDisplay = document.getElementById("detailsDisplay");
let content = '';


fetch(`http://localhost:8083/api/todos/${id}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch ToDo task");
    }
  })
  .then((data) => {
    console.log(data);
    content += `<div class="stickyNote p-5">
    <h1>Category: ${data.category}</h1>
    <h4>Deadline: ${data.deadline}</h4>
    <p>Desc: ${data.description}</p>
    <p>Priority: ${data.priority}</p>
    <a name="" id="markCompletedBTN" class="btn btn-light btn-outline-dark" href="#" role="button" onclick="markCompleted(${id})">MARK COMPLETED</a>
    </div>`;
    detailsDisplay.innerHTML = content;
  })
  .catch((error) => {
    console.error(error);
  });

  function markCompleted(id) {
    // Disable the button
    const markBTN = document.getElementById("markCompletedBTN");
    markBTN.disabled = true;
  
    fetch(`http://localhost:8083/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error('Failed to mark ToDo task as completed');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }  
  
  
  
  
  
  

