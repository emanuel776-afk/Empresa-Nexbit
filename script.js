/* ========================================
   CONFIGURAÇÕES GLOBAIS
   ======================================== */

const WHATSAPP_NUMBER = '33984181008';

let clientes = [];
let equipamentos = [];
let chamados = [];
let diagnosticos = [];
let servicos = [];
let ordens = [];

/* ========================================
   INICIALIZAÇÃO
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  inicializarNavegacao();
  inicializarWhatsApp();
  renderizarDashboard();
  setTimeout(() => {
    renderizarClientes();
    renderizarEquipamentos();
    renderizarChamados();
    renderizarDiagnosticos();
    renderizarServicos();
    renderizarOrdensServico();
    atualizarSelectsClientes();
  }, 100);
});

/* ========================================
   NAVEGAÇÃO
   ======================================== */

function inicializarNavegacao() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const sectionId = href.substring(1);
      mostrarSecao(sectionId);
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function mostrarSecao(sectionId) {
  const sections = document.querySelectorAll('.pagina');
  sections.forEach(section => {
    section.classList.remove('ativa');
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('ativa');
    window.scrollTo({ top: 76, behavior: 'smooth' });
  }
}

window.mostrar = mostrarSecao;

/* ========================================
   WHATSAPP - COMPLETO E FUNCIONAL
   ======================================== */

function inicializarWhatsApp() {
  const botao = document.getElementById('whatsappBotao');
  const menu = document.getElementById('whatsappMenu');
  const opcoes = document.querySelectorAll('.whatsapp-opcao');

  if (!botao || !menu) return;

  // Toggle menu
  botao.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('ativo');
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.whatsapp-container')) {
      menu.classList.remove('ativo');
    }
  });

  // Efeitos nas opções
  opcoes.forEach((opcao, index) => {
    opcao.addEventListener('mouseenter', () => {
      opcao.style.transform = 'translateX(-8px) scale(1.05)';
    });

    opcao.addEventListener('mouseleave', () => {
      opcao.style.transform = '';
    });

    opcao.addEventListener('click', (e) => {
      criarParticulas(opcao);
      mostrarMensagemSucesso('Abrindo WhatsApp...');
      setTimeout(() => {
        menu.classList.remove('ativo');
      }, 300);
    });
  });
}

function criarParticulas(element) {
  const rect = element.getBoundingClientRect();
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: 8px;
      height: 8px;
      background: linear-gradient(135deg, #25D366, #1ed760);
      border-radius: 50%;
      pointer-events: none;
      z-index: 201;
      box-shadow: 0 0 10px rgba(37, 211, 102, 0.6);
    `;

    document.body.appendChild(particle);

    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.animate([
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      {
        transform: `translate(${tx}px, ${ty}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    setTimeout(() => particle.remove(), 600);
  }
}

function mostrarMensagemSucesso(message) {
  const msgContainer = document.createElement('div');
  msgContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #25D366, #1ed760);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 700;
    z-index: 202;
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    animation: slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    font-family: 'Poppins', sans-serif;
  `;

  msgContainer.textContent = message;
  document.body.appendChild(msgContainer);

  setTimeout(() => {
    msgContainer.style.animation = 'slideOutUp 0.4s ease-out forwards';
    setTimeout(() => msgContainer.remove(), 400);
  }, 2500);
}

window.toggleWhatsappMenu = () => {
  const menu = document.getElementById('whatsappMenu');
  menu.classList.toggle('ativo');
};

window.closeWhatsappMenu = () => {
  const menu = document.getElementById('whatsappMenu');
  menu.classList.remove('ativo');
};

/* ========================================
   DADOS - LOCALSTORAGE
   ======================================== */

function carregarDados() {
  clientes = JSON.parse(localStorage.getItem('bitnova_clientes')) || [];
  equipamentos = JSON.parse(localStorage.getItem('bitnova_equipamentos')) || [];
  chamados = JSON.parse(localStorage.getItem('bitnova_chamados')) || [];
  diagnosticos = JSON.parse(localStorage.getItem('bitnova_diagnosticos')) || [];
  servicos = JSON.parse(localStorage.getItem('bitnova_servicos')) || [];
  ordens = JSON.parse(localStorage.getItem('bitnova_ordens')) || [];
}

function salvarDados() {  localStorage.setItem('bitnova_clientes', JSON.stringify(clientes));
  localStorage.setItem('bitnova_equipamentos', JSON.stringify(equipamentos));
  localStorage.setItem('bitnova_chamados', JSON.stringify(chamados));
  localStorage.setItem('bitnova_diagnosticos', JSON.stringify(diagnosticos));
  localStorage.setItem('bitnova_servicos', JSON.stringify(servicos));
  localStorage.setItem('bitnova_ordens', JSON.stringify(ordens));
}

/* ========================================
   DASHBOARD
   ======================================== */

function renderizarDashboard() {
  const stats = document.querySelectorAll('.stat-numero');
  if (stats.length >= 4) {
    animarNumero(stats[0], clientes.length);
    animarNumero(stats[1], equipamentos.length);
    animarNumero(stats[2], chamados.length);
    animarNumero(stats[3], 98);
  }

  const containerChamados = document.getElementById('dashboardChamados');
  if (chamados.length === 0) {
    containerChamados.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">🎫</div><div class=\"vazio-titulo\">Nenhum chamado registrado</div></div>';
  } else {
    containerChamados.innerHTML = chamados.slice(0, 3).map(c => {
      const cliente = clientes.find(cl => cl.id === c.clienteId);
      return `<div class=\"card\">
        <div class=\"card-header\">
          <div><div class=\"card-titulo\">${c.descricao}</div><div class=\"card-subtitulo\">Cliente: ${cliente ? cliente.nome : 'N/A'}</div></div>
          <span class=\"status status-${c.status.toLowerCase().replace(/\\s+/g, '')}\"> ${c.status}</span>
        </div>
        <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarChamado('${c.id}')\">Editar</button></div>
      </div>`;
    }).join('');
  }
}

function animarNumero(elemento, valor) {
  const duracao = 2000;
  const inicio = Date.now();
  const animar = () => {
    const elapsed = Date.now() - inicio;
    const progresso = Math.min(elapsed / duracao, 1);
    elemento.textContent = Math.floor(valor * progresso) + '+';
    if (progresso < 1) requestAnimationFrame(animar);
  };
  animar();
}

/* ========================================
   CLIENTES
   ======================================== */

window.salvarCliente = function(event) {
  event.preventDefault();
  const id = document.getElementById('clienteId').value || Date.now().toString();
  const cliente = {
    id,
    nome: document.getElementById('clienteNome').value,
    telefone: document.getElementById('clienteTelefone').value,
    email: document.getElementById('clienteEmail').value,
    data: new Date().toISOString()
  };
  const index = clientes.findIndex(c => c.id === id);
  if (index > -1) {
    clientes[index] = cliente;
    mostrarNotificacao('Cliente atualizado!', 'sucesso');
  } else {
    clientes.push(cliente);
    mostrarNotificacao('Cliente salvo!', 'sucesso');
  }
  salvarDados();
  document.getElementById('formCliente').reset();
  document.getElementById('clienteId').value = '';
  renderizarClientes();
  atualizarSelectsClientes();
};

function renderizarClientes() {
  const container = document.getElementById('listaClientes');
  if (clientes.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">👥</div><div class=\"vazio-titulo\">Nenhum cliente cadastrado</div></div>';
  } else {
    container.innerHTML = clientes.map(c => `<div class=\"card\">
      <div class=\"card-header\"><div><div class=\"card-titulo\">${c.nome}</div><div class=\"card-subtitulo\">${c.email}</div></div></div>
      <div class=\"card-conteudo\"><div class=\"linha-card\"><span class=\"linha-label\">Telefone:</span><span class=\"linha-valor\">${c.telefone}</span></div></div>
      <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarCliente('${c.id}')\">Editar</button><button class=\"btn btn-pequeno btn-erro\" onclick=\"deletarCliente('${c.id}')\">Deletar</button></div>
    </div>`).join('');
  }
}

window.editarCliente = function(id) {
  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    document.getElementById('clienteId').value = cliente.id;
    document.getElementById('clienteNome').value = cliente.nome;
    document.getElementById('clienteTelefone').value = cliente.telefone;
    document.getElementById('clienteEmail').value = cliente.email;
    window.scrollTo({ top: 76, behavior: 'smooth' });
  }
};

window.deletarCliente = function(id) {
  if (confirm('Deletar este cliente?')) {
    clientes = clientes.filter(c => c.id !== id);
    salvarDados();
    renderizarClientes();
    mostrarNotificacao('Cliente deletado!', 'sucesso');
  }
};

window.cancelarEdicaoCliente = function() {
  document.getElementById('formCliente').reset();
  document.getElementById('clienteId').value = '';
};

function atualizarSelectsClientes() {
  const selects = document.querySelectorAll('[id$=\"Cliente\"]');
  selects.forEach(select => {
    select.innerHTML = '<option value=\"\">Selecione um cliente</option>' +
      clientes.map(c => `<option value=\"${c.id}\">${c.nome}</option>`).join('');
  });
}

/* ========================================
   EQUIPAMENTOS
   ======================================== */

window.salvarEquipamento = function(event) {
  event.preventDefault();
  const id = document.getElementById('equipamentoId').value || Date.now().toString();
  const equipamento = {
    id,
    clienteId: document.getElementById('equipamentoCliente').value,
    tipo: document.getElementById('equipamentoTipo').value,
    modelo: document.getElementById('equipamentoModelo').value,
    serie: document.getElementById('equipamentoSerie').value,
    acessorios: document.getElementById('equipamentoAcessorios').value,
    estado: document.getElementById('equipamentoEstado').value,
    data: new Date().toISOString()
  };
  const index = equipamentos.findIndex(e => e.id === id);
  if (index > -1) {
    equipamentos[index] = equipamento;
    mostrarNotificacao('Equipamento atualizado!', 'sucesso');
  } else {
    equipamentos.push(equipamento);
    mostrarNotificacao('Equipamento salvo!', 'sucesso');
  }
  salvarDados();
  document.getElementById('formEquipamento').reset();
  document.getElementById('equipamentoId').value = '';
  renderizarEquipamentos();
};

function renderizarEquipamentos() {
  const container = document.getElementById('listaEquipamentos');
  if (equipamentos.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">💻</div><div class=\"vazio-titulo\">Nenhum equipamento cadastrado</div></div>';
  } else {
    container.innerHTML = equipamentos.map(e => {
      const cliente = clientes.find(c => c.id === e.clienteId);
      return `<div class=\"card\">
        <div class=\"card-header\"><div><div class=\"card-titulo\">${e.tipo} - ${e.modelo}</div><div class=\"card-subtitulo\">${cliente ? cliente.nome : 'N/A'}</div></div></div>
        <div class=\"card-conteudo\"><div class=\"linha-card\"><span class=\"linha-label\">Série:</span><span class=\"linha-valor\">${e.serie}</span></div></div>
        <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarEquipamento('${e.id}')\">Editar</button><button class=\"btn btn-pequeno btn-erro\" onclick=\"deletarEquipamento('${e.id}')\">Deletar</button></div>
      </div>`;
    }).join('');
  }
}

window.editarEquipamento = function(id) {
  const e = equipamentos.find(x => x.id === id);
  if (e) {
    document.getElementById('equipamentoId').value = e.id;
    document.getElementById('equipamentoCliente').value = e.clienteId;
    document.getElementById('equipamentoTipo').value = e.tipo;
    document.getElementById('equipamentoModelo').value = e.modelo;
    document.getElementById('equipamentoSerie').value = e.serie;
    document.getElementById('equipamentoAcessorios').value = e.acessorios;
    document.getElementById('equipamentoEstado').value = e.estado;
  }
};

window.deletarEquipamento = function(id) {
  if (confirm('Deletar este equipamento?')) {
    equipamentos = equipamentos.filter(e => e.id !== id);
    salvarDados();
    renderizarEquipamentos();
    mostrarNotificacao('Equipamento deletado!', 'sucesso');
  }
};

window.cancelarEdicaoEquipamento = function() {
  document.getElementById('formEquipamento').reset();
  document.getElementById('equipamentoId').value = '';
};

/* ========================================
   CHAMADOS
   ======================================== */

window.salvarChamado = function(event) {
  event.preventDefault();
  const id = document.getElementById('chamadoId').value || Date.now().toString();
  const chamado = {
    id,
    clienteId: document.getElementById('chamadoCliente').value,
    equipamentoId: document.getElementById('chamadoEquipamento').value,
    descricao: document.getElementById('chamadoDescricao').value,
    status: document.getElementById('chamadoStatus').value,
    data: new Date().toISOString()
  };
  const index = chamados.findIndex(c => c.id === id);
  if (index > -1) {
    chamados[index] = chamado;
    mostrarNotificacao('Chamado atualizado!', 'sucesso');
  } else {
    chamados.push(chamado);
    mostrarNotificacao('Chamado aberto!', 'sucesso');
  }
  salvarDados();
  document.getElementById('formChamado').reset();
  document.getElementById('chamadoId').value = '';
  renderizarChamados();
  renderizarDashboard();
};

function renderizarChamados() {
  const container = document.getElementById('listaChamados');
  if (chamados.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">🎫</div><div class=\"vazio-titulo\">Nenhum chamado aberto</div></div>';
  } else {
    container.innerHTML = chamados.map(c => {
      const cliente = clientes.find(cl => cl.id === c.clienteId);
      return `<div class=\"card\">
        <div class=\"card-header\">
          <div><div class=\"card-titulo\">${c.descricao}</div><div class=\"card-subtitulo\">${cliente ? cliente.nome : 'N/A'}</div></div>
          <span class=\"status status-${c.status.toLowerCase().replace(/\\s+/g, '')}\">${c.status}</span>
        </div>
        <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarChamado('${c.id}')\">Editar</button><button class=\"btn btn-pequeno btn-erro\" onclick=\"deletarChamado('${c.id}')\">Deletar</button></div>
      </div>`;
    }).join('');
  }
}

window.editarChamado = function(id) {
  const c = chamados.find(x => x.id === id);
  if (c) {
    document.getElementById('chamadoId').value = c.id;
    document.getElementById('chamadoCliente').value = c.clienteId;
    document.getElementById('chamadoEquipamento').value = c.equipamentoId;
    document.getElementById('chamadoDescricao').value = c.descricao;
    document.getElementById('chamadoStatus').value = c.status;
    mostrarSecao('chamados');
  }
};

window.deletarChamado = function(id) {
  if (confirm('Deletar este chamado?')) {
    chamados = chamados.filter(c => c.id !== id);
    salvarDados();
    renderizarChamados();
    renderizarDashboard();
    mostrarNotificacao('Chamado deletado!', 'sucesso');
  }
};

window.cancelarEdicaoChamado = function() {
  document.getElementById('formChamado').reset();
  document.getElementById('chamadoId').value = '';
};

window.atualizarEquipamentosDoCliente = function() {
  const clienteId = document.getElementById('chamadoCliente').value;
  const select = document.getElementById('chamadoEquipamento');
  const equipamentosCliente = equipamentos.filter(e => e.clienteId === clienteId);
  select.innerHTML = '<option value=\"\">Selecione um equipamento</option>' +
    equipamentosCliente.map(e => `<option value=\"${e.id}\">${e.tipo} - ${e.modelo}</option>`).join('');
};

/* ========================================
   DIAGNÓSTICOS
   ======================================== */

window.salvarDiagnostico = function(event) {
  event.preventDefault();
  const id = document.getElementById('diagnosticoId').value || Date.now().toString();
  const diagnostico = {
    id,
    chamadoId: document.getElementById('diagnosticoChamado').value,
    testes: document.getElementById('diagnosticoTestes').value,
    causa: document.getElementById('diagnosticoCausa').value,
    solucao: document.getElementById('diagnosticoSolucao').value,
    data: new Date().toISOString()
  };
  const index = diagnosticos.findIndex(d => d.id === id);
  if (index > -1) {
    diagnosticos[index] = diagnostico;
    mostrarNotificacao('Diagnóstico atualizado!', 'sucesso');
  } else {
    diagnosticos.push(diagnostico);
    mostrarNotificacao('Diagnóstico salvo!', 'sucesso');
  }
  salvarDados();
  document.getElementById('formDiagnostico').reset();
  document.getElementById('diagnosticoId').value = '';
  renderizarDiagnosticos();
};

function renderizarDiagnosticos() {
  const container = document.getElementById('listaDiagnosticos');
  if (diagnosticos.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">🔍</div><div class=\"vazio-titulo\">Nenhum diagnóstico registrado</div></div>';
  } else {
    container.innerHTML = diagnosticos.map(d => `<div class=\"card\">
      <div class=\"card-header\"><div><div class=\"card-titulo\">Diagnóstico</div><div class=\"card-subtitulo\">${new Date(d.data).toLocaleDateString()}</div></div></div>
      <div class=\"card-conteudo\"><div class=\"linha-card\"><span class=\"linha-label\">Testes:</span><span class=\"linha-valor\">${d.testes}</span></div></div>
      <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarDiagnostico('${d.id}')\">Editar</button><button class=\"btn btn-pequeno btn-erro\" onclick=\"deletarDiagnostico('${d.id}')\">Deletar</button></div>
    </div>`).join('');
  }
}

window.editarDiagnostico = function(id) {
  const d = diagnosticos.find(x => x.id === id);
  if (d) {
    document.getElementById('diagnosticoId').value = d.id;
    document.getElementById('diagnosticoChamado').value = d.chamadoId;
    document.getElementById('diagnosticoTestes').value = d.testes;
    document.getElementById('diagnosticoCausa').value = d.causa;
    document.getElementById('diagnosticoSolucao').value = d.solucao;
  }
};

window.deletarDiagnostico = function(id) {
  if (confirm('Deletar este diagnóstico?')) {
    diagnosticos = diagnosticos.filter(d => d.id !== id);
    salvarDados();
    renderizarDiagnosticos();
    mostrarNotificacao('Diagnóstico deletado!', 'sucesso');
  }
};

window.cancelarEdicaoDiagnostico = function() {
  document.getElementById('formDiagnostico').reset();
  document.getElementById('diagnosticoId').value = '';
};

/* ========================================
   SERVIÇOS
   ======================================== */

window.salvarServico = function(event) {
  event.preventDefault();
  const id = document.getElementById('servicoId').value || Date.now().toString();
  const servico = {
    id,
    chamadoId: document.getElementById('servicoChamado').value,
    tipo: document.getElementById('servicoTipo').value,
    descricao: document.getElementById('servicoDescricao').value,
    data: document.getElementById('servicoData').value,
    dataCadastro: new Date().toISOString()
  };
  const index = servicos.findIndex(s => s.id === id);
  if (index > -1) {
    servicos[index] = servico;
    mostrarNotificacao('Serviço atualizado!', 'sucesso');
  } else {
    servicos.push(servico);
    mostrarNotificacao('Serviço registrado!', 'sucesso');
  }
  salvarDados();
  document.getElementById('formServico').reset();
  document.getElementById('servicoId').value = '';
  renderizarServicos();
};

function renderizarServicos() {
  const container = document.getElementById('listaServicos');
  if (servicos.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">🔧</div><div class=\"vazio-titulo\">Nenhum serviço registrado</div></div>';
  } else {
    container.innerHTML = servicos.map(s => `<div class=\"card\">
      <div class=\"card-header\"><div><div class=\"card-titulo\">${s.tipo}</div><div class=\"card-subtitulo\">${s.data}</div></div></div>
      <div class=\"card-conteudo\"><div class=\"linha-card\"><span class=\"linha-label\">Descrição:</span><span class=\"linha-valor\">${s.descricao}</span></div></div>
      <div class=\"card-acoes\"><button class=\"btn btn-pequeno\" onclick=\"editarServico('${s.id}')\">Editar</button><button class=\"btn btn-pequeno btn-erro\" onclick=\"deletarServico('${s.id}')\">Deletar</button></div>
    </div>`).join('');
  }
}

window.editarServico = function(id) {
  const s = servicos.find(x => x.id === id);
  if (s) {
    document.getElementById('servicoId').value = s.id;
    document.getElementById('servicoChamado').value = s.chamadoId;
    document.getElementById('servicoTipo').value = s.tipo;
    document.getElementById('servicoDescricao').value = s.descricao;
    document.getElementById('servicoData').value = s.data;
  }
};

window.deletarServico = function(id) {
  if (confirm('Deletar este serviço?')) {
    servicos = servicos.filter(s => s.id !== id);
    salvarDados();
    renderizarServicos();
    mostrarNotificacao('Serviço deletado!', 'sucesso');
  }
};

window.cancelarEdicaoServico = function() {
  document.getElementById('formServico').reset();
  document.getElementById('servicoId').value = '';
};

/* ========================================
   ORDEM DE SERVIÇO
   ======================================== */

window.salvarOrdenServico = function(event) {
  event.preventDefault();
  const ordem = {
    id: Date.now().toString(),
    clienteNome: document.getElementById('osClienteNome').value,
    clienteCPF: document.getElementById('osClienteCPF').value,
    clienteTelefone: document.getElementById('osClienteTelefone').value,
    clienteEmail: document.getElementById('osClienteEmail').value,
    clienteEndereco: document.getElementById('osClienteEndereco').value,
    tipoEquipamento: document.getElementById('osTipoEquipamento').value,
    marca: document.getElementById('osMarca').value,
    modelo: document.getElementById('osModelo').value,
    serie: document.getElementById('osSerie').value,
    processador: document.getElementById('osProcessador').value,
    ram: document.getElementById('osRam').value,
    armazenamento: document.getElementById('osArmazenamento').value,
    so: document.getElementById('osSo').value,
    acessorios: Array.from(document.querySelectorAll('input[name=\"acessorios\"]:checked')).map(e => e.value),
    estadoFisico: Array.from(document.querySelectorAll('input[name=\"estadoFisico\"]:checked')).map(e => e.value),
    observacoes: document.getElementById('osObservacoes').value,
    problemaRelatado: document.getElementById('osProblemaRelatado').value,
    diagnostico: Array.from(document.querySelectorAll('input[name=\"diagnostico\"]:checked')).map(e => e.value),
    descricaoDiagnostico: document.getElementById('osDescricaoDiagnostico').value,
    testes: Array.from(document.querySelectorAll('input[name=\"testes\"]:checked')).map(e => e.value),
    servicosExecutados: Array.from(document.querySelectorAll('input[name=\"servicos\"]:checked')).map(e => e.value),
    pecasSubstituidas: document.getElementById('osPecasSubstituidas').value,
    resultado: document.querySelector('input[name=\"resultado\"]:checked')?.value || '',
    observacoesFinal: document.getElementById('osObservacoesFinal').value,
    diasGarantia: document.getElementById('osDiasGarantia').value,
    nomeTecnico: document.getElementById('osNomeTecnico').value,
    nomeCliente: document.getElementById('osNomeCliente').value,
    data: new Date().toISOString()
  };
  ordens.push(ordem);
  salvarDados();
  mostrarNotificacao('Ordem de Serviço salva!', 'sucesso');
  document.getElementById('formOS').reset();
  renderizarOrdensServico();
};

function renderizarOrdensServico() {
  const container = document.getElementById('listaOS');
  if (ordens.length === 0) {
    container.innerHTML = '<div class=\"vazio\"><div class=\"vazio-icone\">📋</div><div class=\"vazio-titulo\">Nenhuma ordem de serviço criada</div></div>';
  } else {
    container.innerHTML = ordens.map(o => `<div class=\"card\">
      <div class=\"card-header\"><div><div class=\"card-titulo\">OS #${o.id.slice(-6)}</div><div class=\"card-subtitulo\">${o.clienteNome}</div></div></div>
      <div class=\"card-conteudo\"><div class=\"linha-card\"><span class=\"linha-label\">Equipamento:</span><span class=\"linha-valor\">${o.marca} ${o.modelo}</span></div></div>
    </div>`).join('');
  }
}

/* ========================================
   NOTIFICAÇÕES
   ======================================== */

function mostrarNotificacao(mensagem, tipo = 'info') {
  const notification = document.createElement('div');
  const cores = {
    sucesso: { bg: 'linear-gradient(135deg, #25D366, #1ed760)', icon: '✓' },
    erro: { bg: 'linear-gradient(135deg, #ff4757, #ff6348)', icon: '✕' },
    info: { bg: 'linear-gradient(135deg, #4A90E2, #1E90FF)', icon: 'ℹ' }
  };
  const config = cores[tipo] || cores.info;
  notification.style.cssText = `position:fixed;bottom:100px;right:26px;background:${config.bg};color:white;padding:16px 24px;border-radius:12px;font-weight:700;z-index:201;box-shadow:0 8px 25px rgba(0,0,0,0.3);display:flex;align-items:center;gap:12px;min-width:280px;animation:slideInUp 0.4s forwards;font-family:'Poppins',sans-serif;`;
  notification.innerHTML = `<span style=\"font-size:20px;font-weight:900;\">${config.icon}</span><span>${mensagem}</span>`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.4s forwards';
    setTimeout(() => notification.remove(), 400);
  }, 3500);
}

/* ========================================
   ESTILOS DINÂMICOS
   ======================================== */

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutUp {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-30px); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideOutDown {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(30px); }
  }
`;
document.head.appendChild(style);