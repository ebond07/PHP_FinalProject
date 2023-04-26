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

  function getMessages() {
    fetch(`http://127.0.0.1:8000/api/v1/messages`)
      .then(response => response.json())
      .then(messages => {
        const chatList = document.querySelector('#messages');
        chatList.innerHTML = '';
        messages.forEach(message => {
          const chatItem = document.createElement('li');
          chatItem.classList.add('chat-item');
          chatItem.classList.add(message.sender == userId ? 'outgoing' : 'incoming');
          chatItem.innerHTML = `
            <div class="message">
              <p>${message.content}</p>
              <span class="time">${message.created_at}</span>
            </div>
          `;
          chatList.appendChild(chatItem);
        });
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while getting messages");
      });
  }

  window.onload = function() {
    getMessages();
  };
  
  