const userId = sessionStorage.getItem('userId');
let recipientId;
let intervalId;

fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`)
  .then(response => response.json())
  .then(user => {
    const usernameElement = document.querySelector('#welcome');
    usernameElement.textContent = `Welcome ${user.name}`;

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
            const chatTitle = document.querySelector('h1');
            chatTitle.textContent = `Chat - ${contact.name}`;
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
  
          const messageContent = document.createElement('div');
          messageContent.classList.add('message');
  
          if (message.image_path) {
            const image = document.createElement('img');
            image.src = message.image_path;
            image.alt = 'Sent Image';
            messageContent.appendChild(image);
          } else {
            const messageText = document.createElement('p');
            messageText.textContent = message.content;
            messageContent.appendChild(messageText);
          }
  
          const time = document.createElement('span');
          time.classList.add('time');
  
          const timestamp = new Date(message.created_at);
  
          const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
          time.textContent = formattedTime;
  
          chatItem.appendChild(messageContent);
          chatItem.appendChild(time);
  
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
  const imageInput = document.querySelector('#imageInput');
  const imageFile = imageInput.files[0];

  if ((messageContent.length > 0 || imageFile) && recipientId) {
    const formData = new FormData();
    formData.append('sender', userId);
    formData.append('recipient', recipientId);
    formData.append('content', messageContent);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/messages', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Message sent successfully');
        messageInput.value = '';
        imageInput.value = '';
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
