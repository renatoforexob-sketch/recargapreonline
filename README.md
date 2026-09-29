# Recarga Fácil

Aplicação React/Vite para consulta e solicitação de recargas pré-pagas. Identificação informada pelo responsável: **SYGMA SOLUCOES LTDA**, CNPJ **30.061.720/0001-28**.

## Rotas

- `/` — página inicial;
- `/recarga-algar`, `/recarga-claro`, `/recarga-correios`, `/recarga-surf`, `/recarga-tim`, `/recarga-vivo` (também com `.html`) — seleção de número e valor;
- `/pagamento` (também `/pagamento.html`) — resumo e Pix quando a integração estiver configurada;
- `/termos-de-uso.html` e `/politica-de-privacidade.html` — rascunhos públicos que devem ser revisados antes do lançamento.

As páginas antigas executáveis em `public/legacy/` foram removidas do pacote publicado. O conteúdo legado continha outra identificação empresarial e rastreadores não usados pelo site atual.

## Desenvolvimento e build

```bash
npm ci
npm run build
npm run dev
```

## Configuração do gateway

Configure `BLACKCAT_API_KEY` somente no painel seguro do ambiente de hospedagem. `BLACKCAT_API_URL` é opcional e, por segurança, deve permanecer no host oficial Blackcat habilitado no código. A rota Pix permanece ativa normalmente quando a chave está configurada. Os campos `BLACKCAT_CLIENT_*` são opcionais em conjunto: configure-os apenas com dados reais e se forem exigidos pelo contrato vigente da API. O `.env.example` não contém credenciais ou dados de cliente fictícios.

**Antes de receber pagamentos reais, confirme com o gateway que o payload atual atende ao contrato vigente.** Este site não coleta identidade do pagador nem inventa nome/e-mail/documento. Se a Blackcat exigir dados de pagador que ainda não estejam configurados, implemente a coleta mínima e revise a política de privacidade. Ative também rate limiting/WAF para `/api/pix`; não há limitador distribuído dentro do código.

## Revisão de segurança

Consulte [`SECURITY.md`](./SECURITY.md) para controles aplicados, verificações obrigatórias antes do lançamento e procedimento inicial de resposta a incidente. Aprovação do Google, operadoras ou gateway não pode ser garantida por código.
