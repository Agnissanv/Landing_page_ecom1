function toggleChat() {
    chatWindow.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", () => {

    const chatWindow = document.getElementById("chatWindow");
    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");

    function toggleChat() {
        chatWindow.classList.toggle("active");
    }

    function addMessage(text, sender) {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement("div");
        typing.id = "typingIndicator";
        typing.className = "message bot";
        typing.innerHTML = `
            <div class="typing">
                <span></span><span></span><span></span>
            </div>`;
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
    }

    function botResponse(text) {
        let response = "Pouvez-vous préciser votre demande ?";

        if (text.includes("bonjour")) response = "Bonjour 👋 Comment puis-je vous aider ?";
        else if (text.includes("prix")) response = "Nos prix dépendent du service demandé.";
        else if (text.includes("horaire")) response = "Nous sommes ouverts de 8h à 18h.";

        showTyping();
        setTimeout(() => {
            removeTyping();
            addMessage(response, "bot");
        }, 1500);
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, "user");
        chatInput.value = "";
        botResponse(text.toLowerCase());
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keydown", e => {
        if (e.key === "Enter") sendMessage();
    });

    window.toggleChat = toggleChat;
});
