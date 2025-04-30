// Get references to the HTML elements
const nameInput = document.getElementById("my-name-input");
const messageInput = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const saveNameButton = document.getElementById("save-name-button");
const chatBox = document.getElementById("chat");

// Disable message input initially
messageInput.disabled = true;
sendButton.disabled = true;

// Escape function to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
        const escape = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return escape[match];
    });
}

// Function to enable message input after the name is saved
function enableMessageInput() {
    messageInput.disabled = false;
    sendButton.disabled = false;
}

// Load saved name and chat history from localStorage
if (localStorage.getItem("username")) {
    nameInput.value = localStorage.getItem("username");
    enableMessageInput();
}

let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Render previous messages
messages.forEach(msg => renderMessage(msg));

// Save name event
saveNameButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem("username", name);
        enableMessageInput();
    } else {
        alert("Please enter a valid name.");
    }
});

// Send message event
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    const username = nameInput.value.trim();

    if (message && username) {
        sendMessage(username, message);
        messageInput.value = "";
    } else {
        alert("Please enter both your name and a message.");
    }
});

// Pressing Enter also sends message
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !sendButton.disabled) {
        sendButton.click();
    }
});

// Send message function
function sendMessage(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date().getTime()
    };

    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    renderMessage(newMessage);
}

// Function to render a message to the chat
function renderMessage(message) {
    const messageHTML = `
        <div class="mine messages">
            <div class="message">${escapeHTML(message.text)}</div>
        </div>
    `;
    chatBox.innerHTML += messageHTML;
    chatBox.scrollTop = chatBox.scrollHeight;
}
