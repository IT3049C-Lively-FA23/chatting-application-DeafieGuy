// Get references to the HTML elements
const nameInput = document.getElementById("my-name-input");
const messageInput = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const saveNameButton = document.getElementById("save-name-button");
const chatBox = document.getElementById("chat");

// Check if a name is saved in localStorage and enable the message input
if (localStorage.getItem("username")) {
    nameInput.value = localStorage.getItem("username");
    enableMessageInput();
}

// Disable message input initially
messageInput.disabled = true;
sendButton.disabled = true;

// Function to enable message input after the name is saved
function enableMessageInput() {
    messageInput.disabled = false;
    sendButton.disabled = false;
}

// Event listener for the "Save Name" button
saveNameButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem("username", name);  // Save the name to localStorage
        enableMessageInput();  // Enable the message input and send button
    } else {
        alert("Please enter a valid name.");
    }
});

// Event listener for the "Send" button
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    const username = nameInput.value.trim();

    if (message && username) {
        sendMessage(username, message);  // Call the function to send the message
        messageInput.value = "";  // Clear the message input field
    } else {
        alert("Please enter both your name and a message.");
    }
});

// Function to send the message
function sendMessage(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date().getTime()
    };

    // You would typically send this message to the server, for example:
    // fetch(serverURL, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newMessage),
    // });

    // For now, just log it
    console.log(newMessage);

    // You could also update the chat window with the new message, e.g.
    chatBox.innerHTML += `
        <div class="mine messages">
            <div class="message">${newMessage.text}</div>
        </div>
    `;
}