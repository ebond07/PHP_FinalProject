// script.js

const form = document.querySelector('#register-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the default form submission

const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;


  try {
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('password', password);
  
    const response = await fetch('http://127.0.0.1:8000/api/v1/users', {
      method: 'POST',
      body: form
    });

    if (response.ok) {
      window.location.href = '../HTML/login.html'; // redirect to login page
    } else {
        console.log(response.status)
      throw new Error('User registration failed');
    }
  } catch (error) {
    console.error(error);
    alert('User registration failed');
  }
});
