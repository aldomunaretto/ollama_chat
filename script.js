document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === "") return;

    appendMessage(message, 'user');
    inputField.value = '';

    // Call the Ollama API with the user's message
    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'llama3.1', // Replace with the model you are using in Ollama
            prompt: message,
            //temperature: 0.5, // adjust as needed
            //n_predict: 100, // adjust as needed
            stream: false
        })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage(data.response, 'api');
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