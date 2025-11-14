async function loadEvents() {
  const res = await fetch("data/fights.json");
  const data = await res.json();
  return data.events;
}
function renderEvents(events) {
  const grid = document.getElementById("eventsGrid");
  const empty = document.getElementById("emptyState");
  grid.innerHTML = "";
  if (!events.length) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");
  events.forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-meta">${ev.date} · ${ev.city}, ${ev.country}</div>
      <div class="event-main">
        <div>
          <h3>${ev.title}</h3>
          <div class="chip-row">
            <span class="tag">${ev.promotion}</span>
            <span class="tag">${ev.weight}</span>
          </div>
        </div>
        <div class="event-meta">
          <div>${ev.venue}</div>
          <div>${ev.broadcast}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
function applyFilters(events) {
  const fighter = document.getElementById("fighter").value.toLowerCase();
  const promotion = document.getElementById("promotion").value;
  const minDate = document.getElementById("minDate").value;
  return events.filter((ev) => {
    if (fighter) {
      const match =
        ev.title.toLowerCase().includes(fighter) ||
        ev.fighters.some((f) => f.toLowerCase().includes(fighter));
      if (!match) return false;
    }
    if (promotion && ev.promotion !== promotion) return false;
    if (minDate && ev.date < minDate) return false;
    return true;
  });
}
document.addEventListener("DOMContentLoaded", async () => {
  const allEvents = await loadEvents();
  renderEvents(allEvents);
  const inputs = ["fighter", "promotion", "minDate"].map((id) =>
    document.getElementById(id)
  );
  inputs.forEach((el) =>
    el.addEventListener("input", () => {
      renderEvents(applyFilters(allEvents));
    })
  );
  document
    .getElementById("clearFilters")
    .addEventListener("click", () => {
      inputs.forEach((el) => (el.value = ""));
      renderEvents(allEvents);
    });
});
