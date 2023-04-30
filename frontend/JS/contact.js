const form = document.querySelector('#add-contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from being submitted

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;

  fetch('http://127.0.0.1:8000/api/v1/users')
    .then(response => response.json())
    .then(users => {
      const user = users.find(user => user.email === email);
      console.log(user.email)
      console.log(user.id)
      if (user) {
        const userId = sessionStorage.getItem('userId');
        console.log(userId)
        const contactId = user.id;

        const contactData = {
          name: name,
          email: email,
          user_id: userId,
          contact_id: contactId
        };

        fetch('http://127.0.0.1:8000/api/v1/setContact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contactData)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert('Contact added successfully');
            form.reset();
            window.location.href = '../HTML/chat.html'
          })
          .catch(error => {
            console.error(error);
            alert("An error occurred while adding the contact");
          });
      } else {
        alert('No user found with that email');
      }
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while searching for the user");
    });
});
