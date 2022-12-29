const pesanForm = document.getElementById('chat-form');
const chatPesan = document.querySelector('.chat-messages') 
const socket = io();



socket.on("message",message => {
    console.log(message);
    pesanMasuk(message);

    // gulir kebawah

    chatPesan.scrollTop = chatPesan.scrollHeight;
});

// ketika pesan disubmit
pesanForm.addEventListener('submit', e => {
        e.preventDefault();

        const msg = e.target.elements.msg.value;

        socket.emit('chatMessage',msg)

        // hapus form input 
        e.target.elements.msg.value = '';
        e.target.elements.msg.focus();
});


function pesanMasuk(pesan) {
    const div = document.createElement('div')
    div.classList.add('message');
    // let date = date()
    div.innerHTML = `<p class="meta">${pesan.username}<span>${pesan.time}</span></p>
    <p class="text">
        ${pesan.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}