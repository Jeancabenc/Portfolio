async function loadData() {
  const res = await fetch("data.json");
  return res.json();
}
let lineChart, barChart;
function renderTable(rows) {
  const table = document.getElementById("dataTable");
  table.innerHTML = "";
  if (!rows.length) return;
  const head = document.createElement("thead");
  head.innerHTML = "<tr><th>Label</th><th>Value</th><th>Extra</th></tr>";
  table.appendChild(head);
  const body = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.label}</td><td>${row.value}</td><td>${row.extra}</td>`;
    body.appendChild(tr);
  });
  table.appendChild(body);
}
function buildCharts(data, category) {
  const ctxLine = document.getElementById("lineChart").getContext("2d");
  const ctxBar = document.getElementById("barChart").getContext("2d");
  const rows = data[category];
  const labels = rows.map((r) => r.label);
  const values = rows.map((r) => r.value);
  if (lineChart) lineChart.destroy();
  if (barChart) barChart.destroy();
  lineChart = new Chart(ctxLine, {
    type: "line",
    data: { labels, datasets: [{ label: "Value", data: values, tension: 0.25 }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#a0a3af" } },
        y: { ticks: { color: "#a0a3af" } },
      },
    },
  });
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: { labels, datasets: [{ label: "Value", data: values }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: "#a0a3af" } },
        y: { ticks: { color: "#a0a3af" } },
      },
    },
  });
  renderTable(rows);
}
document.addEventListener("DOMContentLoaded", async () => {
  const data = await loadData();
  const select = document.getElementById("category");
  buildCharts(data, select.value);
  select.addEventListener("change", () => buildCharts(data, select.value));
});
