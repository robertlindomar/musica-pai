# Leonardo Siqueira de Sousa — Site de Músicas

Site estático para divulgar as músicas do compositor **Leonardo Siqueira de Sousa**. Inclui player de áudio e lista de faixas.

## Conteúdo

- **index.html** — Página principal (cabeçalho, player, lista)
- **styles.css** — Estilos responsivos e acessíveis
- **app.js** — Lógica do player e array de músicas
- **musicas/** — Pasta com os arquivos MP3

## Como usar localmente

1. Coloque todos os arquivos (incluindo a pasta `musicas/`) no mesmo diretório.
2. Abra `index.html` no navegador (duplo clique ou “Abrir com”).
3. Ou use um servidor local, por exemplo:
   - `npx serve .` (Node.js)
   - `python3 -m http.server 8000` (Python)
   - Abrir pela raiz do projeto em editores como VS Code com extensão “Live Server”.

## Deploy (hospedagem estática)

O site não usa backend. Basta enviar a pasta completa para um serviço de hospedagem estática:

- **GitHub Pages:** crie um repositório, envie os arquivos e ative Pages na pasta raiz ou na branch `main`.
- **Netlify:** arraste a pasta do projeto no [Netlify Drop](https://app.netlify.com/drop) ou conecte o repositório Git.
- **Vercel:** conecte o repositório e faça deploy; a raiz do projeto é a pasta do site.

Garanta que a pasta `musicas/` seja enviada junto, pois os MP3s são referenciados por caminhos relativos (`musicas/NOME.mp3`).

## Adicionar ou editar músicas

Edite o array `MUSICAS` em **app.js**. Cada item deve ter:

- **file:** nome exato do arquivo (ex: `"AMOR SINCERO.mp3"`)
- **title:** texto exibido na lista (ex: `"Amor Sincero"`)

Adicione os novos arquivos MP3 na pasta `musicas/` e inclua um novo objeto no array.

## Requisitos

- Navegador moderno com suporte a HTML5 (elemento `<audio>`)
- Arquivos MP3 na pasta `musicas/` com os nomes indicados em `app.js`
