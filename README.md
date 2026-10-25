Link do projeto online: https://everctba.github.io/long-shadow-css-generator/
![print-site](./preview-desktop.png)

Gerador de `text-shadow` em camadas: ajuste os passos, veja o efeito no palco e copie o
CSS pronto — com as cores já em variáveis.

## Cores como variáveis CSS

No seletor **"Cores no CSS gerado"** (painel da direita) dá para exportar o efeito
com as cores em variáveis CSS, em vez de valores fixos:

- **Variáveis CSS (color-mix)** — padrão. O bloco gerado expõe `--shadow-color`,
  `--text-color` e `--bg-color`; a sombra usa
  `color-mix(in srgb, var(--shadow-color) X%, transparent)` para aplicar o alpha de
  cada passo. Trocar a cor depois é editar uma linha.
- **Variáveis CSS (canais RGB)** — expõe `--shadow-rgb: r, g, b` e usa
  `rgba(var(--shadow-rgb), alpha)`. Compatibilidade máxima (funciona em navegadores
  sem `color-mix`).
- **Valores fixos (rgba)** — comportamento antigo, sem variáveis.

Os três modos produzem exatamente o mesmo resultado visual. No modo `em` (proporcional),
`--shadow-scale` continua funcionando junto das variáveis de cor.

## Interface

A interface segue o design system em [`DESIGN.md`](./DESIGN.md). Os tokens ficam no
`:root` do `index.html` (superfícies, `--primary`, raios, sombra ambiente e movimento),
então trocar a paleta é editar só aquele bloco. A página é estática e não tem build.

A faixa superior traz o nome do projeto e o botão **Sobre** (canto direito), que abre um
modal com autor, e-mail, site, versão e os links de LinkedIn, Behance, GitHub e e-mail —
com a foto de perfil em `fotoever.jpeg`, recortada em círculo (`border-radius: 50%`;
se o arquivo faltar, o modal mostra as iniciais).
![Sobre](./preview-sobre.png)
