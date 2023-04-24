// script.js

const form = document.querySelector('#register-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the default form submission

const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;


  try {
    const response = await fetch('http://127.0.0.1:8080/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
      alert('User registration successful!');
      window.location.href = '/frontend/HTML/login.html'; // redirect to login page
    } else {
        console.log(response.status)
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error(error);
    alert('User registration failed');
  }
});
