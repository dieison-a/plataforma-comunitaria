const solicitacoes = [
  { tema: "Orientação digital", resumo: "Demonstração de apoio para acessar um serviço na internet.", situacao: "Em andamento", estado: "andamento", data: "Hoje · 09:20" },
  { tema: "Acesso a serviços", resumo: "Exemplo fictício de encaminhamento para atendimento.", situacao: "Concluída", estado: "concluido", data: "Ontem · 15:10" },
  { tema: "Informação comunitária", resumo: "Pedido de informações sobre canais de participação.", situacao: "Em andamento", estado: "andamento", data: "Ontem · 11:45" }
];

const listaSolicitacoes = document.querySelector("#solicitacoes");
const vazio = document.querySelector("#vazio");
const totalSolicitacoes = document.querySelector("#total-solicitacoes");
const retornoFormulario = document.querySelector("#retorno-formulario");
const filtros = [...document.querySelectorAll(".filtro")];
let filtroAtivo = "todos";

function desenhar() {
  const visiveis = solicitacoes.filter((solicitacao) => filtroAtivo === "todos" || solicitacao.estado === filtroAtivo);
  listaSolicitacoes.replaceChildren();
  for (const solicitacao of visiveis) {
    const solicitacaoEl = document.createElement("article");
    solicitacaoEl.className = "solicitacao";
    const icone = document.createElement("span");
    icone.className = "icone-solicitacao";
    icone.textContent = solicitacao.estado === "concluido" ? "✓" : "↗";
    const corpo = document.createElement("div");
    corpo.className = "corpo-solicitacao";
    const titulo = document.createElement("h3");
    titulo.textContent = solicitacao.tema;
    const resumo = document.createElement("p");
    resumo.textContent = solicitacao.resumo;
    const metadados = document.createElement("div");
    metadados.className = "metadados-solicitacao";
    const data = document.createElement("span");
    data.textContent = solicitacao.data;
    const situacao = document.createElement("span");
    situacao.className = `situacao${solicitacao.estado === "concluido" ? " concluida" : ""}`;
    situacao.textContent = solicitacao.situacao;
    metadados.append(data, situacao);
    corpo.append(titulo, resumo, metadados);
    solicitacaoEl.append(icone, corpo);
    listaSolicitacoes.append(solicitacaoEl);
  }
  totalSolicitacoes.textContent = String(solicitacoes.length).padStart(2, "0");
  vazio.hidden = visiveis.length > 0;
}

for (const botao of filtros) {
  botao.addEventListener("click", () => {
    filtroAtivo = botao.dataset.situacao;
    for (const filtroAtual of filtros) {
      const ativo = filtroAtual === botao;
      filtroAtual.classList.toggle("ativo", ativo);
      filtroAtual.setAttribute("aria-pressed", String(ativo));
    }
    desenhar();
  });
}

document.querySelector("#formulario-solicitacao").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tema = document.querySelector("#tema").value;
  const descricao = document.querySelector("#descricao").value.trim();
  if (!tema || !descricao) return;
  solicitacoes.unshift({ tema, resumo: descricao, situacao: "Em andamento", estado: "andamento", data: "Agora · demonstração" });
  document.querySelector("#formulario-solicitacao").reset();
  retornoFormulario.textContent = "Solicitação adicionada somente a esta sessão.";
  filtroAtivo = "todos";
  for (const botao of filtros) {
    const ativo = botao.dataset.situacao === "todos";
    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  }
  desenhar();
});

desenhar();

