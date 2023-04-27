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

function getMessages(userId) {
  fetch(`http://127.0.0.1:8000/api/v1/messages/sender/${userId}/receiver/7`)
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
  getMessages(userId);
};

const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const messageInput = document.querySelector('input[type="text"]');
  const messageContent = messageInput.value.trim();
  if (messageContent.length > 0) {
    const message = {
      sender: userId,
      receiver: 7,
      content: messageContent
    };
    fetch('http://127.0.0.1:8000/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => {
        if (response.ok) {
          messageInput.value = '';
          getMessages(userId);
        } else {
          throw new Error('Failed to send message');
        }
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while sending the message');
      });
  }
});
