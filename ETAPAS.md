# Yzzo Digital: etapas do projeto

Landing page de **uma página só** para a Yzzo Digital, agência de marketing
esportivo focada em futebol. A base técnica é a mesma da apresentação da
Danielli Noivas (Vite + React + Tailwind, publicada na Vercel). O que muda é o
objetivo: a da Danielli era um material para colar no WhatsApp, sem saída
nenhuma. Esta é o site da agência. Ela precisa **apresentar a agência, mostrar
o portfólio e levar a pessoa para o WhatsApp**.

---

## Dados que já temos

| item | valor | de onde veio |
| --- | --- | --- |
| Nome | Yzzo Digital | você |
| WhatsApp | +55 11 96039-4405 | você |
| Bio | Agência de marketing esportivo · +700 projetos · Criatividade & Qualidade | você |
| Instagram | @yzzodigital | print do perfil |
| E-mail | yzzodigital@gmail.com | print do perfil |
| Link da bio | linktr.ee/yzzodigital | print do perfil |
| Categoria | Image management | print do perfil |
| Destaques | Brasil 2026 · Motion's · Agências | print do perfil |

---

## Etapa 1: base e limpeza ✅ (feita agora)

- O repositório era uma cópia do projeto da Danielli. Saiu tudo o que era dela
  (fotos, vestidos, avaliações, vídeos, textos e os documentos `.md`).
- **Nada foi apagado.** Tudo o que era dela foi movido para
  `_legado-danielli/`, que fica fora do Git. Se não precisar mais, pode apagar
  essa pasta (o projeto original continua em `../atelierdaniellinoivas`).
- Ficou o que era estrutura: o build, a animação de entrada das seções, a
  dupla de fotos sobrepostas, a faixa em movimento, o vídeo vertical que só
  baixa quando aparece na tela, o deslize horizontal e os scripts de imagem e
  vídeo.
- Agora é **um único `index.html`** na raiz. A Danielli tinha um HTML por
  apresentação; aqui é uma página só.
- **Diferente da Danielli, o site pode ser encontrado no Google.** A dela era
  `noindex` porque era material de conversa. Site de agência precisa ser
  achado.

## Etapa 2: identidade visual provisória ✅ (feita agora, tirada do Instagram)

Enquanto o branding não chega, a identidade foi tirada dos posts:

| papel | valor | onde aparece no Instagram |
| --- | --- | --- |
| Amarelo da marca | `#F0C40F` | barra "#TimeYzzoDigital", marca-texto atrás das palavras, triângulos |
| Papel | `#F3F3F3` | fundo dos posts "Novo Cliente!" e "Sua imagem também deveria" |
| Preto | `#111111` | títulos e o post "Grandes conquistas" |
| Títulos | **Sofia Sans Extra Condensed** | o "Novo Cliente!" e o "GRANDES CONQUISTAS", condensado e alto |
| Texto | **Poppins** | o "Seu desempenho fala por você" e o "#TimeYzzoDigital" |

E os recursos gráficos repetidos dos posts: a **barra amarela arredondada**
com "#TimeYzzoDigital ── 2026 ©", o **marca-texto amarelo** atrás de uma
palavra, os **triângulos amarelos** nas bordas e o **raio** da logo.

> ⚠️ **A logo é provisória**: a única versão que eu tinha era a foto de perfil
> de 150px, pequena demais. Montei o "YZZO" em código, com o raio amarelo. Ela
> é trocada inteira quando o branding chegar (etapa 4).

## Etapa 3: a página ✅ (feita agora)

Mesma ordem de raciocínio da Danielli (abrir forte, provar autoridade, mostrar
trabalho, prova social, fechar com convite), adaptada para agência:

| # | seção | o que tem | equivalente na Danielli |
| --- | --- | --- | --- |
| 0 | **Topo** | logo, âncoras (Agência, Serviços, Portfólio, Contato) e botão de WhatsApp | não tinha (era sem saída, de propósito) |
| 1 | **Capa** | "Seu desempenho fala por você. Sua *imagem* também deveria." com a foto da camisa 20 | capa com a filha |
| 2 | **Faixa em movimento** | CONVOCADO! · NOVO CLIENTE! · CAMPEÃO · #TimeYzzoDigital | faixa de marcas |
| 3 | **A agência** | quem é, +700 projetos, dupla de foto e vídeo | "O ateliê" |
| 4 | **Serviços** | design, motion, fotografia, gestão de imagem e atendimento a agências | "O que oferecemos" |
| 5 | **Portfólio** | artes deslizando de lado · vídeos (placeholder) · fotos de jogo em mural, tudo abrindo em tela cheia | deslize de modelos + vídeos + mural de casamentos |
| 6 | **#TimeYzzoDigital** | os posts "Novo Cliente!" passando em faixa | avaliações do Google |
| 7 | **Como trabalhamos** | 6 passos + botão para a página de parceiros | "Como funciona" |
| 8 | **Contato** | "Grandes conquistas começam com grandes decisões." + WhatsApp, e-mail e Instagram | o convite final |
| 9 | **Rodapé** | logo, contatos, © | rodapé |

**Vídeos:** os três espaços de Motion e o da seção "A agência" estão como
**placeholder**, com uma foto de fundo e o aviso "vídeo em breve". Quando os
vídeos chegarem, eles entram em `videos-originais/`, o script
`scripts/videos.mjs` comprime, e o placeholder vira vídeo sozinho.

## Etapa 3b: página para agências e empresários ✅ (em aprovação)

**`/parceiros`**, "Como funciona a Yzzo". É o link para mandar quando alguém
pergunta "como funciona a empresa de vocês?". Tem HTML próprio
(`parceiros.html`) para ter **cartão próprio no WhatsApp**
(`og-parceiros.jpg`), como as apresentações da Danielli.

Montada a partir da pesquisa de outubro de 2026 sobre como agências de imagem
de atleta trabalham:

| # | seção | a pergunta que ela responde |
| --- | --- | --- |
| 1 | Capa: "Como funciona a Yzzo" · "O empresário cuida da carreira. A Yzzo cuida da vitrine." · +700 projetos | como funciona? |
| 2 | Faixa em movimento com as entregas (Convocação, Novo clube, Melhores momentos…) | |
| 3 | Vocês negociam, a Yzzo mostra (agenciamento + imagem) | vão pegar meu atleta? |
| 4 | O que o seu atleta recebe (5 entregas), com a dupla vídeo de melhores momentos + arte | o que eu ganho? |
| 5 | Planos semanal, quinzenal e mensal, com o calendário de entregas de cada um | quanto e com que ritmo? |
| 6 | Para quem tem uma carteira de atletas | e para a minha agência? |
| 7 | Quem já é #TimeYzzoDigital (faixa dos "Novo Cliente!") | quem já trabalha com vocês? |
| 8 | Como trabalhamos (6 passos) | como começa? |
| 9 | Atleta de base, com responsabilidade | e com atleta menor de idade? |
| 10 | Perguntas frequentes | e aquela outra dúvida? |
| 11 | Contato, com mensagem pronta de parceiro | como falo com vocês? |

Cada botão abre o WhatsApp já com a mensagem certa ("Vim pela página de
parceiros e quero saber sobre o plano Semanal"), para a Yzzo saber de onde
veio o contato.

**⚠️ A Yzzo precisa confirmar** (tudo em `src/data/planos.ts`):

1. **O que entra em cada plano.** As quantidades (12/6/3 artes, Reels,
   cobertura) são proposta minha, tirada do mercado.
2. **Preço:** hoje "sob consulta". Se quiserem mostrar "a partir de", entra
   um campo.
3. **Os serviços avulsos:** vídeo de melhores momentos, cobertura de jogo,
   identidade do atleta e mídia kit. Fazem todos?
4. **Para agências:** pacote por atleta, arte com a marca da agência, prazo
   de urgência e um ponto de contato. É isso mesmo?
5. **As perguntas frequentes** (`src/data/duvidas.ts`): as respostas repetem
   os planos e o processo, então valem as mesmas confirmações.
6. **O vídeo de melhores momentos:** o espaço está em placeholder. Se tiverem
   um exemplo, ele entra como `melhores-momentos.mp4` em `videos-originais/`.
7. **A arte "2025"** aparece como exemplo de arte em parceria (tem a marca
   da Sabu Sports). A legenda não cita o nome, mas vale combinar com eles.

**⚠️ Jurídico:** a seção de atleta de base fala em autorização dos pais com
finalidade e prazo (LGPD e ECA Digital, em vigor desde março de 2026). Um
advogado deve conferir o modelo de autorização da Yzzo e se impulsionar post
de atleta menor exige alvará judicial (Decreto 12.880/2026).

## Etapa 4: branding oficial ⏳ (depende de você)

O que eu preciso:

1. **Logo em vetor** (SVG, PDF ou AI), versão escura e clara, e o símbolo
   sozinho se existir. Com ela: logo do topo e do rodapé, favicon e o cartão
   de compartilhamento.
2. **Manual ou guia** com as cores e as fontes oficiais. Se forem diferentes
   das que tirei do Instagram, troco num lugar só (`src/index.css`).
3. Elementos gráficos que a marca usa (os triângulos, o raio, texturas).

## Etapa 5: conteúdo real ⏳ (depende de você)

| o que | onde entra | situação |
| --- | --- | --- |
| **Vídeos** (Motion) | portfólio e "A agência" | placeholder |
| **Textos dos serviços** | `src/data/servicos.ts` | ⚠️ escritos por mim a partir do que aparece no Instagram. Confirmar se é isso mesmo que a agência vende |
| **Como trabalhamos** | `src/data/processo.ts` | ⚠️ 6 passos tirados da pesquisa de mercado. Confirmar o processo de verdade |
| **Planos e avulsos** | `src/data/planos.ts` | ⚠️ proposta. Ver a etapa 3b |
| **Números** | `src/data/numeros.ts` | só "+700 projetos" é confirmado. Atletas atendidos, clubes, anos de agência: mandar se quiser mostrar |
| **Depoimentos** de atletas ou pais | nova seção | não existe ainda |
| **Logos de clubes e marcas** | faixa em movimento | hoje a faixa é de palavras; com logos, vira faixa de clubes |
| **Domínio** | `src/lib/brand.ts` e `index.html` | provisório: `yzzodigital.vercel.app` |

> ⚠️ **Autorização de imagem.** Boa parte dos atletas do portfólio é menor de
> idade (Sub-15, Sub-17). As fotos já são públicas no Instagram da agência,
> mas o site é outro uso. Vale confirmar que o contrato com os responsáveis
> cobre o site também.

## Etapa 6: ajustes ⏳ (os que você pedir)

Mesma dinâmica da Danielli: você manda o ajuste (texto, áudio, print) e eu
aplico.

## Etapa 7: publicação ⏳

1. ✅ **Repositório novo:**
   [imnotlopes/yzzodigital](https://github.com/imnotlopes/yzzodigital), com
   histórico limpo (nada da Danielli). O remoto dela ficou nesta pasta com o
   nome `danielli`, e não deve receber push daqui.
2. Projeto novo na Vercel, ligado a esse repositório.
3. Domínio próprio, se houver.
4. Conferir o cartão do link no WhatsApp e no Instagram.
5. Celular primeiro: abrir no telefone, no 4G, antes de mandar para alguém.

---

## Para rodar

```bash
npm install
```

```bash
npm run dev
```

| comando | o que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | gera `dist/` para publicar |
| `node scripts/importar-instagram.mjs` | converte as fotos de `instagram/` para `public/` |
| `node scripts/videos.mjs` | comprime os vídeos de `videos-originais/` para `public/videos/` |
| `node scripts/og.mjs` | gera a imagem do cartão de link |
