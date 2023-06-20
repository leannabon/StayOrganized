document.getElementById("registrationForm").addEventListener("submit", function(event){
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const pwd = document.getElementById("pwd").value;
    const confirmpwd = document.getElementById("confirmpwd").value;
    const errorMsg = document.getElementById("errorMsg");

    if(pwd !== confirmpwd){
      errorMsg.textContent = "Passwords do not match!";
    } else {
      errorMsg.textContent = "";
      const userData = {
        name: name,
        username: username,
        password: pwd
      };
      fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => {
        if(response.status === 403) {
          throw new Error('Username is already in use');
        }
        return response.json();
      })
      .then(data => {
        alert('User created successfully');
      })
      .catch((error) => {
        errorMsg.textContent = error.message;
      });
    }
  });