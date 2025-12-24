const CHAT_API_URL = "https://apex-chat-backend-7asc.vercel.app/api/chat";

const launcher = document.createElement("button");
launcher.id = "apex-chat-launcher";
launcher.textContent = "💬";

const widget = document.createElement("div");
widget.id = "apex-chat-widget";
widget.innerHTML = `
  <div id="apex-chat-header">
    Apex AI Assistant
    <span id="apex-close" style="cursor:pointer;">×</span>
  </div>
  <div id="apex-chat-messages"></div>
  <div id="apex-chat-input">
    <input id="apex-input" placeholder="Type your message..." />
    <button id="apex-send">Send</button>
  </div>
`;

document.body.appendChild(widget);
document.body.appendChild(launcher);

const messages = widget.querySelector("#apex-chat-messages");
const input = widget.querySelector("#apex-input");

launcher.onclick = () => widget.style.display = "flex";
widget.querySelector("#apex-close").onclick = () => widget.style.display = "none";

function add(text, cls) {
  const div = document.createElement("div");
  div.className = `apex-msg ${cls}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

widget.querySelector("#apex-send").onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  add(text, "user");
  input.value = "";

  const res = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  add(data.reply || "Sorry, something went wrong.", "bot");
};

add("Hi! 👋 I can help you learn about our AI chatbots or book a demo.", "bot");
