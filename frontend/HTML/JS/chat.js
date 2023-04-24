const userId = sessionStorage.getItem('userId');

fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
  .then(response => response.json())
  .then(user => {
    const usernameElement = document.querySelector('#username');
    usernameElement.textContent = `Hello, ${user.name}`;

    fetch(`http://127.0.0.1:8000/api/v1/getContactsByUser/${userId}`)
      .then(response => response.json())
      .then(contacts => {
        const chatsElement = document.querySelector('#chats');
        chatsElement.innerHTML = '';

        contacts.forEach(contact => {
          const chatElement = document.createElement('li');
          chatElement.textContent = contact.name;
          chatsElement.appendChild(chatElement);
        });
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while getting contacts data");
      });
  })
  .catch(error => {
    console.error(error);
    alert("An error occurred while getting user data");
  });
