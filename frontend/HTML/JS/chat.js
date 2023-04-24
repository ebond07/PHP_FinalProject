const userId = sessionStorage.getItem('userId');

fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
  .then(response => response.json())
  .then(user => {
    const usernameElement = document.querySelector('#username');
    usernameElement.textContent = `Hello, ${user.name}`;
  })
  .catch(error => {
    console.error(error);
    alert("An error occurred while getting user data");
  });
