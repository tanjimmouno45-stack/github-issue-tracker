const API_URL = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const demoIssues = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: "Fix Navigation Menu on Mobile Devices",
  description:
    "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsiveness behavior.",
  status: i % 7 === 0 ? "closed" : "open",
  author: ["Fahim Ahmed", "John Doe", "Jane Smith"][i % 3],
  priority: ["High", "Medium", "Low"][i % 3],
  label: ["bug", "enhancement", "help wanted"][i % 3],
  createdAt: "12/10/2024",
}));
let issues = [],
  activeTab = "all",
  searchText = "";
const app = document.getElementById("app");
function login() {
  app.innerHTML = `<main class="login-page"><form class="login-card" id="loginForm"><div class="login-logo">●</div><h1>GitHub Issues Tracker</h1><p>Sign in to manage your project issues</p><label>Username<input id="username" required placeholder="Enter Username"></label><label>Password<input id="password" required type="password" placeholder="Enter Password"></label><div class="error" id="error"></div><button>Sign In</button><div class="credentials">Demo Credentials<br>Username: admin<br>Password: admin123</div></form></main>`;
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (username.value === "admin" && password.value === "admin123") loadApp();
    else error.textContent = "Invalid username or password.";
  });
}
async function loadApp() {
  app.innerHTML =
    '<main class="app"><header class="navbar"><div class="brand"><span class="github">●</span>GitHub Issues Tracker</div><div class="search"><input id="search" placeholder="Search issues..."><button class="new-issue">+ New Issue</button></div></header><section class="content"><nav class="tabs"><button data-tab="all" class="active">All</button><button data-tab="open">Open</button><button data-tab="closed">Closed</button></nav><div id="summary" class="summary"></div><div id="grid" class="issue-grid"></div></section></main>';
  document.querySelectorAll("[data-tab]").forEach(
    (b) =>
      (b.onclick = () => {
        activeTab = b.dataset.tab;
        document
          .querySelectorAll("[data-tab]")
          .forEach((x) => x.classList.toggle("active", x === b));
        render();
      }),
  );
  document.getElementById("search").oninput = (e) => {
    searchText = e.target.value.toLowerCase();
    render();
  };
  document.getElementById("grid").innerHTML = "<p>Loading issues...</p>";
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    issues = Array.isArray(data) ? data : data.data || demoIssues;
  } catch (e) {
    issues = demoIssues;
  }
  render();
}
function render() {
  const visible = issues.filter(
    (x) =>
      (activeTab === "all" || x.status === activeTab) &&
      String(x.title || "")
        .toLowerCase()
        .includes(searchText),
  );
  summary.innerHTML = `<div class="summary-info"><span class="issue-icon">⊙</span><div><strong>${visible.length} Issues</strong><small>Track and manage your project issues</small></div></div><div class="legend"><span class="dot open-dot"></span>Open <span class="dot closed-dot"></span>Closed</div>`;
  grid.innerHTML =
    visible
      .map(
        (issue) =>
          `<button class="issue-card ${issue.status}" data-id="${issue.id}"><div class="card-top"><span class="card-icon">◉</span><span class="priority ${String(issue.priority).toLowerCase()}">${issue.priority}</span></div><h3>${issue.title}</h3><p>${issue.description}</p><div class="labels"><span class="label">${issue.label || "bug"}</span><span class="label yellow">${String(issue.priority).toLowerCase()}</span></div><small>Author: ${issue.author || "Unknown"}</small><small>Created: ${issue.createdAt || "12/10/2024"}</small></button>`,
      )
      .join("") || "<p>No issues found.</p>";
  document
    .querySelectorAll(".issue-card")
    .forEach(
      (card) =>
        (card.onclick = () =>
          showModal(issues.find((x) => String(x.id) === card.dataset.id))),
    );
}
function showModal(issue) {
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<article class="modal" role="dialog"><div class="summary-info"><span class="issue-icon">⊙</span><div><strong>Issue Details</strong><small>#${issue.id}</small></div></div><h2>${issue.title}</h2><p>${issue.description}</p><div class="details"><span>Author<b>${issue.author}</b></span><span>Priority<b>${issue.priority}</b></span><span>Status<b>${issue.status}</b></span></div><button class="close">Close</button></article>`;
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  modal.querySelector(".close").onclick = () => modal.remove();
  document.body.appendChild(modal);
}
login();
