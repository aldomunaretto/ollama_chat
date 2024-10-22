let context = null; // Global variable to store the context

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
});

const fileDropZone = document.getElementById('file-drop-zone');
const fileInput = document.getElementById('file-input');

fileDropZone.addEventListener('click', () => fileInput.click());
fileDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropZone.classList.add('dragover');
});
fileDropZone.addEventListener('dragleave', () => fileDropZone.classList.remove('dragover'));
fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

function handleFiles(files) {
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            appendMessage(`File uploaded: ${file.name}`, 'user');
            // Aquí puedes enviar el contenido del archivo a la API si es necesario
        };
        reader.readAsDataURL(file); // Puedes cambiar esto según el tipo de archivo
    }
}

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === "") return;

    appendMessage(message, 'user');
    inputField.value = '';

    const body = {
        model: 'llama3.1', // Replace with the model you are using in Ollama
        prompt: message,
        stream: false
    };

    if (context) {
        body.context = context; // Include the context in the next call to the API
    }

    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        appendMessage(data.response, 'api');
        if (data.context) {
            context = data.context;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage("There was an error processing your request.", 'api');
    });
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.innerText = text;
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}