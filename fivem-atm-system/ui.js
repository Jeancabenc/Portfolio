const STORAGE_KEY = "atm_demo_state";
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { balance: 0, history: [] };
    return JSON.parse(raw);
  } catch { return { balance: 0, history: [] }; }
}
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function formatCurrency(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 }); }
const state = loadState();
function render() {
  document.getElementById("balanceValue").textContent = formatCurrency(state.balance);
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  if (!state.history.length) {
    const li = document.createElement("li");
    li.textContent = "No transactions yet.";
    list.appendChild(li);
    return;
  }
  state.history.slice().reverse().forEach((tx) => {
    const li = document.createElement("li");
    li.textContent = `${tx.type.toUpperCase()} ${formatCurrency(tx.amount)} · New balance: ${formatCurrency(tx.balance)} · ${tx.time}`;
    list.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  render();
  document.querySelectorAll(".atm-menu button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".atm-menu button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const view = btn.getAttribute("data-view");
      document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
      document.getElementById(`view-${view}`).classList.add("active");
    });
  });
  document.getElementById("depositBtn").addEventListener("click", () => {
    const val = Number(document.getElementById("depositAmount").value);
    if (!val || val <= 0) return alert("Enter a valid amount.");
    state.balance += val;
    state.history.push({ type: "deposit", amount: val, balance: state.balance, time: new Date().toLocaleString() });
    saveState(state); render(); document.getElementById("depositAmount").value = "";
  });
  document.getElementById("withdrawBtn").addEventListener("click", () => {
    const val = Number(document.getElementById("withdrawAmount").value);
    if (!val || val <= 0) return alert("Enter a valid amount.");
    if (val > state.balance) return alert("Insufficient funds.");
    state.balance -= val;
    state.history.push({ type: "withdraw", amount: val, balance: state.balance, time: new Date().toLocaleString() });
    saveState(state); render(); document.getElementById("withdrawAmount").value = "";
  });
});
