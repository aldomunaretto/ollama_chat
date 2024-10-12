let context = null; // Global variable to store the context

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

    // Request Body if context is available
    const body = {
        model: 'llama3.1', // Replace with the model you are using in Ollama
        prompt: message,
        // temperature: 0.7, // Optional parameter to control the randomness of the response
        stream: false
    };

    if (context) {
        body.context = context; // Include the context in the next call to the API
    }

    // Call the API with the user message
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
        // Store the new context for the next call to the API
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