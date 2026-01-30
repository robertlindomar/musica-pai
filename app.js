/**
 * Site de músicas — Leonardo Siqueira de Sousa
 * Player de áudio e lista de faixas.
 */

const MUSICAS = [
  { file: "A  PESCARIA.mp3", title: "A Pescaria" },
  { file: "AMOR SINCERO.mp3", title: "Amor Sincero" },
  { file: "APIMENTAMOS COM FOGO.mp3", title: "Apimentamos com Fogo" },
  { file: "AQUELE SEU OLHAR 2.mp3", title: "Aquele Seu Olhar" },
  { file: "ASSIM O VELHINHO NAO GUENTA.mp3", title: "Assim o Velhinho Não Guenta" },
  { file: "BONS AMIGOS_1.mp3", title: "Bons Amigos" },
  { file: "BORBOLETA MIX.mp3", title: "Borboleta Mix" },
  { file: "CHARRETTE TURBINADA.mp3", title: "Charrette Turbinada" },
  { file: "CHIFRE PRA CORNO E POUCO.mp3", title: "Chifre pra Corno é Pouco" },
  { file: "CUPIDO DO AMOR.mp3", title: "Cupido do Amor" },
  { file: "DOR DE CORNO.mp3", title: "Dor de Corno" },
  { file: "EU PRECISO TANTO SER FELIZ 2.mp3", title: "Eu Preciso Tanto Ser Feliz" },
  { file: "EU TO DO LADO ERRADO.mp3", title: "Eu Tô do Lado Errado" },
  { file: "FLORES E PAIXAO.mp3", title: "Flores e Paixão" },
  { file: "GAGUINHO.mp3", title: "Gaguinho" },
  { file: "GARÇOM POR FAVOR.mp3", title: "Garçom Por Favor" },
  { file: "GEMEOS.mp3", title: "Gêmeos" },
  { file: "HOMENAGEM AO FUSCA.mp3", title: "Homenagem ao Fusca" },
  { file: "JOGADO AS TRAÇAS.mp3", title: "Jogado às Traças" },
  { file: "KU KE MANDA_2.mp3", title: "Ku Ke Manda" },
  { file: "LUANA.mp3", title: "Luana" },
  { file: "MORENA MATOGROSSENSE.mp3", title: "Morena Matogrossense" },
  { file: "MOTIVOS.mp3", title: "Motivos" },
  { file: "NAO TO ACREDITANDO.mp3", title: "Não Tô Acreditando" },
  { file: "O FIM E O COMEÇO.mp3", title: "O Fim e o Começo" },
  { file: "O REI DO FORRO.mp3", title: "O Rei do Forró" },
  { file: "OH!! MINHA PAIXAO MINEIRA.mp3", title: "Oh!! Minha Paixão Mineira" },
  { file: "OU ROSA OU FLOR_1.mp3", title: "Ou Rosa ou Flor" },
  { file: "PEROLA  DO SERTAO.mp3", title: "Pérola do Sertão" },
  { file: "PODE FICAR SOSSEGADO.mp3", title: "Pode Ficar Sossegado" },
  { file: "REMEDIO PRA SOLIDAO.mp3", title: "Remédio pra Solidão" },
  { file: "ROSAS DO INTERIOR.mp3", title: "Rosas do Interior" },
  { file: "SE PRECISO FOR_2.mp3", title: "Se Precisar For" },
  { file: "SEGUNDO ROUD.mp3", title: "Segundo Round" },
  { file: "SUBTAMENTE_1.mp3", title: "Subitamente" },
  { file: "TAO TRISTE.mp3", title: "Tão Triste" },
  { file: "TICO TICO.mp3", title: "Tico Tico" },
  { file: "TO NA  RUA  DECIMA.mp3", title: "Tô na Rua de Cima" },
  { file: "TO QUERENDO 3.mp3", title: "Tô Querendo" },
  { file: "TO QUERENDO OUVIR MODAO.mp3", title: "Tô Querendo Ouvir Modão" },
  { file: "UM ZERO A ESQUERDA.mp3", title: "Um Zero à Esquerda" },
  { file: "VOU BOTAR TURBO NA CHARRET.mp3", title: "Vou Botar Turbo na Charret" },
  { file: "VOU VIVENDO POR VIVER.mp3", title: "Vou Vivendo por Viver" },
];

const BASE = "musicas/";

/**
 * Monta URL do áudio codificando o nome do arquivo.
 * @param {string} filename - Nome do arquivo (ex: "A  PESCARIA.mp3")
 * @returns {string} URL relativa codificada
 */
function urlDaMusica(filename) {
  return BASE + encodeURIComponent(filename);
}

const audio = document.getElementById("audio");
const currentTrackEl = document.getElementById("currentTrack");
const currentTimeEl = document.getElementById("currentTime");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const btnPlay = document.getElementById("btnPlay");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const tracklistEl = document.getElementById("tracklist");

let indiceAtual = -1;

/**
 * Formata segundos em MM:SS.
 * @param {number} s - Segundos
 * @returns {string}
 */
function formatTime(s) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + (sec < 10 ? "0" : "") + sec;
}

/**
 * Atualiza o texto da faixa e do tempo no player.
 */
function atualizarInfo() {
  if (indiceAtual < 0 || indiceAtual >= MUSICAS.length) {
    currentTrackEl.textContent = "Selecione uma música";
    currentTimeEl.textContent = "0:00 / 0:00";
    return;
  }
  currentTrackEl.textContent = MUSICAS[indiceAtual].title;
  const current = audio.currentTime;
  const duration = audio.duration;
  currentTimeEl.textContent = formatTime(current) + " / " + (Number.isFinite(duration) ? formatTime(duration) : "0:00");
}

/**
 * Atualiza a barra de progresso e o estado de play/pause.
 */
function atualizarUI() {
  const duration = audio.duration;
  if (Number.isFinite(duration) && duration > 0) {
    progressBar.value = (audio.currentTime / duration) * 100;
  } else {
    progressBar.value = 0;
  }
  atualizarInfo();
  btnPlay.textContent = audio.paused ? "▶" : "❚❚";
  btnPlay.setAttribute("aria-label", audio.paused ? "Reproduzir" : "Pausar");

  document.querySelectorAll(".tracklist__item--current").forEach((el) => el.classList.remove("tracklist__item--current"));
  const item = tracklistEl.querySelector(`[data-index="${indiceAtual}"]`);
  if (item) item.closest(".tracklist__item").classList.add("tracklist__item--current");
}

/**
 * Toca a faixa pelo índice.
 * @param {number} index - Índice em MUSICAS
 */
function tocar(index) {
  if (index < 0 || index >= MUSICAS.length) return;
  indiceAtual = index;
  const src = urlDaMusica(MUSICAS[index].file);
  audio.src = src;
  audio.load();
  audio.play().catch(() => {});
  atualizarUI();
}

/**
 * Próxima faixa (ou primeira se no fim).
 */
function proxima() {
  if (MUSICAS.length === 0) return;
  tocar((indiceAtual + 1) % MUSICAS.length);
}

/**
 * Faixa anterior (ou última se no início).
 */
function anterior() {
  if (MUSICAS.length === 0) return;
  tocar(indiceAtual <= 0 ? MUSICAS.length - 1 : indiceAtual - 1);
}

/**
 * Monta a lista de músicas no DOM.
 */
function renderizarLista() {
  tracklistEl.innerHTML = "";
  MUSICAS.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = "tracklist__item";
    if (i === indiceAtual) li.classList.add("tracklist__item--current");
    const a = document.createElement("a");
    a.href = "#";
    a.className = "tracklist__link";
    a.textContent = m.title;
    a.setAttribute("data-index", i);
    a.addEventListener("click", (e) => {
      e.preventDefault();
      tocar(i);
    });
    li.appendChild(a);
    tracklistEl.appendChild(li);
  });
}

// Eventos do áudio
audio.addEventListener("timeupdate", atualizarUI);
audio.addEventListener("ended", proxima);
audio.addEventListener("loadedmetadata", atualizarUI);
audio.addEventListener("durationchange", atualizarUI);

// Botões
btnPlay.addEventListener("click", () => {
  if (indiceAtual < 0) {
    if (MUSICAS.length > 0) tocar(0);
    return;
  }
  if (audio.paused) audio.play(); else audio.pause();
  atualizarUI();
});

btnPrev.addEventListener("click", anterior);
btnNext.addEventListener("click", proxima);

// Barra de progresso: arrastar
progressBar.addEventListener("input", () => {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  audio.currentTime = (progressBar.value / 100) * audio.duration;
  atualizarUI();
});

// Volume
volumeBar.addEventListener("input", () => {
  audio.volume = volumeBar.value / 100;
});

// Inicialização
renderizarLista();
atualizarInfo();
