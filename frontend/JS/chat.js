const userId = sessionStorage.getItem('userId');
let recipientId;
let intervalId;

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
          chatElement.addEventListener('click', () => {
            recipientId = contact.contact_id; // or whatever property holds the recipient ID
            clearInterval(intervalId); // clear any previous interval
            intervalId = setInterval(() => getMessages(userId, recipientId), 2000); // call getMessages() every 2 seconds
            getMessages(userId, recipientId);
          });
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

function getMessages(userId, recipientId) {
  fetch(`http://127.0.0.1:8000/api/v1/messages/sender/${userId}/receiver/${recipientId}`)
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

const form = document.querySelector('form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const messageInput = document.querySelector('input[type="text"]');
  const messageContent = messageInput.value.trim();
  if (messageContent.length > 0 && recipientId) {
    const formData = new FormData();
    formData.append('sender', userId);
    formData.append('recipient', recipientId);
    formData.append('content', messageContent);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/messages', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Message sent successfully');
        messageInput.value = '';
      } else {
        console.error(response.status);
        const data = await response.json();
        console.error(data);
        alert('An error occurred while sending the message');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while sending the message');
    }
    
  }
  
});
