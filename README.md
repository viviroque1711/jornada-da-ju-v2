# Viva a Vida, Juliana!

Uma campanha digital de solidariedade, narrada em primeira pessoa e construída a partir da história e das fotografias autorizadas de Juliana Batista.

## Experiência

- Narrativa em primeira pessoa organizada em capítulos.
- Fotografias reais distribuídas ao longo da jornada.
- Identidade editorial em preto, branco e amarelo dourado.
- Design responsivo e animações suaves.
- QR Code Pix e botão de cópia do BR Code.
- Compartilhamento por WhatsApp.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Prévia online\n\nA publicação de pré-visualização é feita pelo GitHub Pages a partir da branch de desenvolvimento. O workflow publica automaticamente após cada atualização.\n\n## Desenvolvimento

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Conteúdo e aprovação

O texto de primeira pessoa é um rascunho editorial escrito com base nos relatos enviados para a campanha. Juliana deve revisar e aprovar a redação, os dados de saúde, a cronologia e cada imagem antes da divulgação definitiva.

A campanha deve:
- Evitar prognósticos, interpretações médicas ou detalhes que Juliana não confirmou.
- Explicar claramente a finalidade e a responsabilidade pelo recebimento das doações.
- Atualizar periodicamente a prestação de contas.
- Não publicar documentos médicos, dados bancários completos ou informações pessoais desnecessárias.

## Pix

A pasta `public/images` contém o QR Code estático compartilhado para a campanha. O BR Code Copia e Cola está configurado em `src/content.ts` e o QR Code foi decodificado para conferir que os dados correspondem.

**Antes de divulgar amplamente:** fazer uma contribuição de teste de baixo valor em outro aplicativo bancário, conferir se o nome apresentado é **Lourdes Aparecida Batista**, e confirmar o crédito no extrato da conta destinatária. O site não intermedeia pagamentos nem confirma recebimentos.

## Arquivos principais

- `src/App.tsx`: estrutura da experiência.
- `src/content.ts`: narrativa, conteúdo e configuração Pix.
- `src/styles.css`: identidade visual, responsividade e movimento.
- `public/images/`: fotos autorizadas e QR Code da campanha.

Este repositório é público. Somente incluir fotografias e informações com autorização expressa.
