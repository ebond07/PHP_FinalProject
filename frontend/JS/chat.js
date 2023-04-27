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
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const messageInput = document.querySelector('input[type="text"]');
  const messageContent = messageInput.value.trim();
  if (messageContent.length > 0) {
    
    const form = document.querySelector('form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const messageInput = document.querySelector('input[type="text"]');
  const messageContent = messageInput.value.trim();
  if (messageContent.length > 0) {
    const formData = new FormData();
    formData.append('sender', userId);
    formData.append('recipient', 7);
    formData.append('content', messageContent);

    try {
      // create a FormData object from the form

      const response = await fetch('http://127.0.0.1:8000/api/v1/messages', {
        method: 'POST',
        body: formData,
      });
      console.log(response.status, formData);

    
      if (response.ok) {
        // success
        console.log('Message sent successfully');
        messageInput.value = '';
        getMessages(userId);
      } else {
        // failure
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
  }
})




