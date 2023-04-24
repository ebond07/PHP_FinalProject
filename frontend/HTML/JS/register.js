// script.js

const form = document.getElementById('register-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      alert('User registration successful!');
      window.location.href = 'login.html'; // redirect to login page
    } else {
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error(error);
    alert('User registration failed');
  }
});
