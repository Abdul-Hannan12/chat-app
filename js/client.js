const socket = io('http://localhost:8000');

const form = document.getElementById('send');
const msg_input = document.getElementById('msgInput');
const msg_container = document.querySelector('.container');

let audio = new Audio('noti.mp3');

const append = (message, status)=>{
    const  messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(status);
    msg_container.append(messageElement);
    if (status == 'received'){
        audio.play();
    }
};

const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msg_input.value;
    append(`You: ${message}`, 'sent');
    socket.emit('send', message);
    msg_input.value = "";
});

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'alert');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'received');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'alert');
});
