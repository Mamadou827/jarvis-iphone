const chat = document.getElementById("chat");
const form = document.getElementById("composer");
const input = document.getElementById("prompt");
const notice = document.getElementById("notice");

function addMessage(text, who) {
  const box = document.createElement("div");
  box.className = `message ${who}`;
  const label = document.createElement("span");
  label.className = "speaker";
  label.textContent = who === "user" ? "TOI" : "JARVIS";
  const p = document.createElement("p");
  p.textContent = text;
  box.append(label, p);
  chat.appendChild(box);
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addMessage(value, "user");
  addMessage("J'ai bien reçu ton message dans cette maquette. La connexion au cerveau en ligne sera ajoutée dans une prochaine étape.", "jarvis");
  input.value = "";
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.prompt;
    input.focus();
  });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = document.getElementById("mic");
if (SpeechRecognition) {
  mic.addEventListener("click", () => {
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => { input.value = event.results[0][0].transcript; };
    recognition.onerror = () => { notice.textContent = "La dictée vocale n'est pas disponible dans ce navigateur ou cette configuration. Tu peux écrire ton message."; };
    recognition.start();
  });
} else {
  mic.addEventListener("click", () => {
    notice.textContent = "La dictée vocale n'est pas prise en charge ici. Essaie le micro du clavier de l'iPhone.";
  });
}
