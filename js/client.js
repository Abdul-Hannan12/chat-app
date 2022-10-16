const socket = io('http://localhost:8000');

const form = document.getElementById('send');
const msg_input = document.getElementById('msgInput');
const msg_container = document.querySelector('.container');

const append = (message, status)=>{
    const  messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(status);
    msg_container.append(messageElement);
};

const sendMessage = (e)=>{
    e.preventDefault();
    const message = msg_input.value;
    append(`You: ${message}`);
}

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

form.addEventListener('submit', sendMessage());

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'joined');
});

socket.on('receive', data => {
    append(`${data.message} : ${data.user}`, 'received');
});
