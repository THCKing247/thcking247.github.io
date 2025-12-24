<script>
(() => {
  // ✅ UPDATE THIS to your deployed backend endpoint:
  const CHAT_API_URL = "https://YOUR-BACKEND-DOMAIN/chat";

  // Create widget DOM
  const launcher = document.createElement("button");
  launcher.id = "apex-chat-launcher";
  launcher.textContent = "💬";

  const widget = document.createElement("div");
  widget.id = "apex-chat-widget";
  widget.innerHTML = `
    <div id="apex-chat-header">
      <div>
        Apex AI Assistant <small>online</small>
      </div>
      <span id="apex-close">×</span>
    </div>

    <div id="apex-chat-messages"></div>

    <div class="apex-typing" id="apex-typing" style="display:none;">Typing…</div>

    <div class="apex-quick-actions">
      <button class="apex-chip" id="apex-book">Book a demo</button>
      <button class="apex-chip" id="apex-pricing">Pricing</button>
      <button class="apex-chip" id="apex-human">Talk to a human</button>
    </div>

    <div id="apex-chat-input">
      <input type="text" id="apex-user-input" placeholder="Type your message..." />
      <button id="apex-send">Send</button>
    </div>
  `;

  document.body.appendChild(widget);
  document.body.appendChild(launcher);

  const closeBtn = widget.querySelector("#apex-close");
  const sendBtn  = widget.querySelector("#apex-send");
  const input    = widget.querySelector("#apex-user-input");
  const messages = widget.querySelector("#apex-chat-messages");
  const typing   = widget.querySelector("#apex-typing");

  const btnBook   = widget.querySelector("#apex-book");
  const btnPricing= widget.querySelector("#apex-pricing");
  const btnHuman  = widget.querySelector("#apex-human");

  function addMessage(text, sender) {
    const row = document.createElement("div");
    row.className = `apex-row ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "apex-bubble";
    bubble.textContent = text;
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping(isOn){ typing.style.display = isOn ? "block" : "none"; }

  launcher.onclick = () => {
    widget.style.display = "flex";
    launcher.style.display = "none";
    input.focus();
  };

  closeBtn.onclick = () => {
    widget.style.display = "none";
    launcher.style.display = "block";
  };

  btnBook.onclick = () => addAndSend("I want to book a demo.");
  btnPricing.onclick = () => addAndSend("Can you share pricing ranges?");
  btnHuman.onclick = () => addMessage(
    "You can reach us at info@apextsgroup.com or 831-915-6596. 😊",
    "bot"
  );

  async function addAndSend(text){
    addMessage(text, "user");
    await sendMessage(text);
  }

  async function sendMessage(explicitText) {
    const text = (explicitText ?? input.value).trim();
    if (!text) return;
    input.value = "";

    showTyping(true);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // optional context you can use later:
          page: window.location.href
        })
      });

      if (!res.ok) throw new Error("Bad response");
      const data = await res.json();
      addMessage(data.reply || "Sorry — I had trouble responding. Please email info@apextsgroup.com.", "bot");
    } catch (e) {
      addMessage("Sorry — I had trouble responding. Please email info@apextsgroup.com.", "bot");
    } finally {
      showTyping(false);
    }
  }

  sendBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    sendMessage(text);
  };

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
  });

  // Greeting
  addMessage("Hi! 👋 I can answer questions about our AI chatbots or help you book a demo at https://apextsgroup.com/booking", "bot");
})();
</script>
