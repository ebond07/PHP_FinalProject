const form = document.querySelector('#login-form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from being submitted

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  fetch('http://127.0.0.1:8000/api/v1/users')
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.email === email);
      console.log(users)
      console.log(user.password)
      if (user && user.email === email) {
        // Store the user ID in sessionStorage
        sessionStorage.setItem('userId', user.id);

        // Redirect to chat.html
        window.location.href = '../HTML/chat.html';
      } else {
        const errorMessage = user ? 'Invalid email or password' : 'No user found with that email';
        alert(errorMessage);
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while logging in");
    });
});
