const requests = [
  { topic: "Orientação digital", summary: "Demonstração de apoio para acessar um serviço online.", status: "Em andamento", state: "open", date: "Hoje · 09:20" },
  { topic: "Acesso a serviços", summary: "Exemplo fictício de encaminhamento para atendimento.", status: "Concluída", state: "done", date: "Ontem · 15:10" },
  { topic: "Informação comunitária", summary: "Pedido de informações sobre canais de participação.", status: "Em andamento", state: "open", date: "Ontem · 11:45" }
];

const container = document.querySelector("#requests");
const empty = document.querySelector("#empty");
const total = document.querySelector("#request-total");
const feedback = document.querySelector("#form-feedback");
const filters = [...document.querySelectorAll(".filter")];
let activeFilter = "all";

function render() {
  const visible = requests.filter((request) => activeFilter === "all" || request.state === activeFilter);
  container.replaceChildren();
  for (const request of visible) {
    const item = document.createElement("article");
    item.className = "request";
    const icon = document.createElement("span");
    icon.className = "request-icon";
    icon.textContent = request.state === "done" ? "✓" : "↗";
    const body = document.createElement("div");
    body.className = "request-body";
    const title = document.createElement("h3");
    title.textContent = request.topic;
    const summary = document.createElement("p");
    summary.textContent = request.summary;
    const meta = document.createElement("div");
    meta.className = "request-meta";
    const date = document.createElement("span");
    date.textContent = request.date;
    const status = document.createElement("span");
    status.className = `status${request.state === "done" ? " done" : ""}`;
    status.textContent = request.status;
    meta.append(date, status);
    body.append(title, summary, meta);
    item.append(icon, body);
    container.append(item);
  }
  total.textContent = String(requests.length).padStart(2, "0");
  empty.hidden = visible.length > 0;
}

for (const button of filters) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.status;
    for (const item of filters) {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    }
    render();
  });
}

document.querySelector("#request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const topic = document.querySelector("#topic").value;
  const description = document.querySelector("#description").value.trim();
  if (!topic || !description) return;
  requests.unshift({ topic, summary: description, status: "Em andamento", state: "open", date: "Agora · demonstração" });
  document.querySelector("#request-form").reset();
  feedback.textContent = "Solicitação adicionada somente a esta sessão.";
  activeFilter = "all";
  for (const button of filters) {
    const active = button.dataset.status === "all";
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }
  render();
});

render();
