function switchTab(tab) {
  document.querySelectorAll(".mt-tabs button")
    .forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".mt-panel")
    .forEach((p) => p.classList.toggle("active", p.id === `tab-${tab}`));
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mt-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });
  document.getElementById("pwGenerate").addEventListener("click", () => {
    const length = Number(document.getElementById("pwLength").value) || 12;
    const useUpper = document.getElementById("pwUpper").checked;
    const useNumbers = document.getElementById("pwNumbers").checked;
    const useSymbols = document.getElementById("pwSymbols").checked;
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) chars += "0123456789";
    if (useSymbols) chars += "!@$%&*?";
    let out = "";
    for (let i = 0; i < length; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById("pwOutput").textContent = out;
  });
  const RATE = 60;
  document.getElementById("convUsdToDop").addEventListener("click", () => {
    const usd = Number(document.getElementById("usdInput").value) || 0;
    document.getElementById("dopInput").value = (usd * RATE).toFixed(2);
  });
  document.getElementById("convDopToUsd").addEventListener("click", () => {
    const dop = Number(document.getElementById("dopInput").value) || 0;
    document.getElementById("usdInput").value = (dop / RATE).toFixed(2);
  });
  const NOTES_KEY = "mt_notes";
  const notesArea = document.getElementById("notesArea");
  notesArea.value = localStorage.getItem(NOTES_KEY) || "";
  document.getElementById("notesSave").addEventListener("click", () => {
    localStorage.setItem(NOTES_KEY, notesArea.value);
    alert("Notes saved locally.");
  });
  const form = document.getElementById("demoForm");
  const errorList = document.getElementById("valErrors");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorList.innerHTML = "";
    const errors = [];
    const email = document.getElementById("valEmail").value.trim();
    const pw = document.getElementById("valPassword").value;
    const pw2 = document.getElementById("valPassword2").value;
    if (!email.includes("@") || !email.includes(".")) {
      errors.push("Enter a valid email address.");
    }
    if (pw.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (pw !== pw2) {
      errors.push("Passwords do not match.");
    }
    if (!errors.length) {
      alert("Form looks good!");
      return;
    }
    errors.forEach((msg) => {
      const li = document.createElement("li");
      li.textContent = msg;
      errorList.appendChild(li);
    });
  });
});
