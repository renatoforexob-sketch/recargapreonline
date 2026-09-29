import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import './styles.css';

const operators = {
  algar: { slug: 'algar', name: 'Algar', logo: '/assets/images/algar.png', banner: '/assets/images/banner-algar.png' },
  claro: { slug: 'claro', name: 'Claro', logo: '/assets/images/claro.png', banner: '/assets/images/banner-claro.png' },
  correios: { slug: 'correios', name: 'Correios Celular', logo: '/assets/images/correios.png', banner: '/assets/images/banner-correios.png' },
  surf: { slug: 'surf', name: 'Surf Telecom', logo: '/assets/images/surf.png', banner: '/assets/images/banner-surf.png' },
  tim: { slug: 'tim', name: 'TIM', logo: '/assets/images/tim.png', banner: '/assets/images/banner-tim.png' },
  vivo: { slug: 'vivo', name: 'Vivo', logo: '/assets/images/vivo.png', banner: '/assets/images/banner-vivo.png' },
};
const values = [20, 25, 30, 35, 40, 50, 60, 70, 100];
const bonusByValue = { 20: '4 GB', 25: '6 GB', 30: '8 GB', 35: '10 GB', 40: '14 GB', 50: '20 GB', 60: '25 GB', 70: '32 GB', 100: '50 GB' };
const planBonus = value => `+${bonusByValue[value] || '4 GB'} • 30 dias`;
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const onlyDigits = value => value.replace(/\D/g, '').slice(0, 11);
const formatPhone = value => { const d = onlyDigits(value); if (d.length <= 2) return d ? `(${d}` : ''; if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`; return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`; };
function path() { return window.location.pathname.replace(/\/$/, '') || '/'; }
function go(to) { window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }

function Header() {
  const openOperators = () => {
    if (path() === '/') document.getElementById('operadoras')?.scrollIntoView({ behavior: 'smooth' });
    else { go('/'); setTimeout(() => document.getElementById('operadoras')?.scrollIntoView({ behavior: 'smooth' }), 50); }
  };
  return <header className="topbar">
    <button className="brand" onClick={() => go('/')}><span className="brand-mark">↗</span><span>Recarga <b>Fácil</b></span></button>
    <nav><a href="#operadoras">Operadoras</a><a href="#como-funciona">Como funciona</a><a href="#duvidas">Dúvidas</a></nav>
    <button className="header-cta" onClick={openOperators}>Fazer recarga <span>→</span></button>
  </header>;
}
function Footer() {
  return <footer>
    <div>
      <strong>Recarga Fácil</strong>
      <p>Plataforma digital para consulta e solicitação de recargas pré-pagas.</p>
      <p>Confirme operadora, número e valor antes de pagar.</p>
    </div>
    <div>
      <strong>Atalhos</strong>
      <a href="#operadoras">Escolher operadora</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#duvidas">Dúvidas frequentes</a>
    </div>
    <div>
      <strong>Responsável pela plataforma</strong>
      <p>SYGMA SOLUCOES LTDA</p>
      <p>CNPJ: 30.061.720/0001-28</p>
      <p>R. Marconi, 107, sala 702 — República<br/>São Paulo/SP — CEP 01047-000</p>
      <a href="mailto:atendimento@sygmasolucoes.com.br">atendimento@sygmasolucoes.com.br</a>
      <a href="tel:+551120739875">(11) 2073-9875</a>
    </div>
    <div className="footer-legal">
      <a href="/termos-de-uso.html">Termos de Uso</a>
      <a href="/politica-de-privacidade.html">Política de Privacidade</a>
      <small>Marcas de operadoras pertencem aos respectivos titulares. A identificação não implica endosso.</small>
    </div>
    <small>© {new Date().getFullYear()} Recarga Fácil. Todos os direitos reservados.</small>
  </footer>;
}
function Home() {
  const [faq, setFaq] = useState(null);
  const faqs = [
    ['Posso recarregar o celular de outra pessoa?', 'Sim. Você pode informar o número de outra pessoa, escolher a operadora correspondente e selecionar o valor da recarga.'],
    ['Preciso criar uma conta?', 'Não. O processo foi pensado para ser simples e não exige criação de conta para iniciar a recarga.'],
    ['Quais operadoras aparecem?', 'A plataforma apresenta opções para Vivo, Claro, TIM, Surf Telecom, Correios Celular e Algar. A disponibilidade da recarga depende da linha e da operadora.'],
    ['Quais valores estão disponíveis?', 'Estão disponíveis recargas de R$20, R$25, R$30, R$35, R$40, R$50, R$60, R$70 e R$100.'],
    ['Como faço o pagamento?', 'Depois de informar o número e escolher o valor, você segue para a etapa de pagamento via Pix. O valor é mostrado antes da confirmação.'],
    ['A recarga é para celular pré-pago?', 'Sim. A plataforma é destinada a recargas de linhas pré-pagas nas operadoras disponíveis.']
  ];

  return <>
    <Header/>
    <main className="home home-new">
      <section className="top-banner">
        <div className="home-banner home-banner-top text-banner">
          <span className="eyebrow">RECARGA PRÉ-PAGA ONLINE</span>
          <h1>Escolha a operadora e confira os dados antes de pagar.</h1>
          <p>Consulte as opções disponíveis, informe o número que receberá a recarga e veja o valor total antes de seguir para o Pix.</p>
          <button className="banner-cta" onClick={() => document.getElementById('operadoras')?.scrollIntoView({ behavior: 'smooth' })}>Ver operadoras <span>→</span></button>
        </div>
      </section>


      <section id="operadoras" className="operators-section home-operators">
        <div className="section-heading">
          <div><span className="eyebrow">ESCOLHA UMA OPÇÃO</span><h2>Qual é a sua operadora?</h2></div>
          <p>Selecione a operadora e siga para<br/>as opções de recarga disponíveis.</p>
        </div>
        <div className="operator-grid">
          {Object.values(operators).map(op => <button className="operator-card" key={op.slug} onClick={() => go(`/recarga-${op.slug}`)}>
            <span className={`operator-logo operator-logo-${op.slug}`}><img src={op.logo} alt={op.name}/></span>
            <span><strong>{op.name}</strong></span>
            <b className="arrow">↗</b>
          </button>)}
        </div>
      </section>

      <section className="content-section why-section">
        <div className="content-heading">
          <span className="eyebrow">SIMPLES DO COMEÇO AO FIM</span>
          <h2>Por que recarregar seu celular pré-pago pela Recarga Fácil?</h2>
        </div>
        <div className="feature-list">
          <div><span>✓</span><strong>Processo simples e transparente.</strong></div>
          <div><span>✓</span><strong>Escolha a operadora e o valor da sua recarga.</strong></div>
          <div><span>✓</span><strong>Pagamento via Pix.</strong></div>
          <div><span>✓</span><strong>Atendimento para recargas pré-pagas.</strong></div>
          <div><span>✓</span><strong>Recarga para o seu próprio número ou para outra pessoa.</strong></div>
          <div><span>✓</span><strong>Valores de R$20 a R$100.</strong></div>
          <div><span>✓</span><strong>Experiência simples, sem necessidade de criar conta.</strong></div>
        </div>
      </section>

      <section id="como-funciona" className="content-section info-section">
        <div className="content-heading centered-heading">
          <span className="eyebrow">INFORMAÇÕES SOBRE RECARGA PRÉ-PAGA</span>
          <h2>Entenda como funciona.</h2>
        </div>
        <div className="info-cards">
          <article><span className="info-number">01</span><h3>Pagamento via Pix</h3><p>Escolha sua recarga e realize o pagamento pelo Pix. O valor da operação deve ser apresentado claramente antes da confirmação.</p></article>
          <article><span className="info-number">02</span><h3>Valores de R$20 a R$100</h3><p>Confira os valores disponíveis para cada opção de recarga.</p></article>
          <article><span className="info-number">03</span><h3>Opções de operadora</h3><p>A plataforma apresenta Vivo, Claro, TIM, Surf Telecom, Correios Celular e Algar. Informe o número que receberá a recarga — pode ser o seu celular ou o de outra pessoa.</p></article>
        </div>
      </section>

      <section className="content-section everything-section">
        <div className="content-heading">
          <span className="eyebrow">TUDO SOBRE SUA RECARGA PRÉ-PAGA</span>
          <h2>Recarga de celular pré-pago online.</h2>
        </div>
        <div className="article-grid">
          <article><h3>Recarga de celular pré-pago online</h3><p>Fazer uma recarga pré-paga pela Recarga Fácil é simples: informe o número que receberá a recarga, escolha a operadora, selecione o valor disponível e siga para o pagamento via Pix.</p></article>
          <article><h3>Crédito para o celular de outra pessoa</h3><p>A recarga não precisa ser para o seu próprio número. Basta informar o número que receberá a recarga, escolher a operadora da linha e o valor desejado.</p></article>
          <article><h3>Valores de R$20 a R$100</h3><p>Na Recarga Fácil, estão disponíveis recargas de R$20, R$25, R$30, R$35, R$40, R$50, R$60, R$70 e R$100. Confira o valor da recarga no resumo da solicitação antes de pagar.</p></article>
          <article><h3>Pagamento via Pix</h3><p>O pagamento é realizado via Pix. O valor da operação é apresentado claramente antes da confirmação.</p></article>
        </div>
      </section>

      <section id="duvidas" className="faq home-faq">
        <span className="eyebrow">PERGUNTAS FREQUENTES</span>
        <h2>Perguntas frequentes sobre recarga pré-paga</h2>
        {faqs.map(([question, answer], i) => <div className={`faq-row ${faq === i ? 'open' : ''}`} key={question}>
          <button onClick={() => setFaq(faq === i ? null : i)}><span>{question}</span><b>{faq === i ? '−' : '+'}</b></button>
          {faq === i && <p>{answer}</p>}
        </div>)}
      </section>
    </main>
    <Footer/>
  </>;
}

function OperatorPage({ operator }) {
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState(40);
  const [error, setError] = useState('');
  const [faq, setFaq] = useState(null);

  const submit = e => {
    e.preventDefault();
    if (onlyDigits(phone).length !== 11 || onlyDigits(phone)[2] !== '9') return setError('Informe um celular válido com DDD (11 dígitos).');
    if (!selected) return setError('Escolha um valor para continuar.');
    const data = {
      phone: formatPhone(phone),
      operator: operator.slug,
      operatorName: operator.name,
      amount: selected,
      bonus: planBonus(selected),
    };
    sessionStorage.setItem('recargaData', JSON.stringify(data));
    go(`/pagamento?operadora=${operator.slug}&valor=${selected}`);
  };

  return <>
    <Header/>
    <main className={`recharge-page operator-modern operator-${operator.slug}`}>
      <section className="operator-top-banner">
        <img src={operator.banner} alt={`Banner de recarga ${operator.name}; consulte as condições do bônus anunciado`} />
      </section>
      <form className="operator-main-card" onSubmit={submit}>
        <div className="operator-intro">
          <div className="operator-logo-large">
            <img src={operator.logo} alt={operator.name}/>
          </div>
          <h1>Recarga {operator.name} Online</h1>
          <button type="button" className="change-operator" onClick={() => go('/')}>
            Não é {operator.name}? <strong>Trocar operadora</strong>
          </button>
          <p>Informe o número da linha pré-paga, escolha um valor e confira os dados antes de seguir para o pagamento.</p>
        </div>

        <div className="operator-form-section">
          <div className="operator-step-title">
            <span>1</span>
            <div><strong>Informe o número</strong><small>Digite o celular {operator.name} que receberá a recarga.</small></div>
          </div>
          <label className="field-label" htmlFor="phone">Número do celular</label>
          <input id="phone" className="phone-input" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength="16" required aria-describedby="phone-help" placeholder="(00) 00000-0000" value={phone} onChange={e => { setPhone(formatPhone(e.target.value)); setError(''); }}/>
          <div className="helper" id="phone-help">Você pode recarregar o seu número ou o celular de outra pessoa.</div>
        </div>

        <div className="operator-values-section">
          <div className="operator-step-title">
            <span>2</span>
            <div><strong>Escolha o valor da recarga</strong><small>Selecione o valor desejado.</small></div>
          </div>
          <div className="modern-value-grid">
            {values.map(value => <button type="button" key={value} className={`modern-value-option ${selected === value ? 'active' : ''}`} onClick={() => setSelected(value)}>
              <div><span>A PARTIR DE</span><strong>{money(value)}</strong></div>
              <div className="modern-bonus"><b>+{bonusByValue[value]}</b><small>BÔNUS DE INTERNET</small><em>30 dias</em></div>
              {value === 30 && <span className="popular-badge">MAIS ESCOLHIDO</span>}
            </button>)}
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}
        <div className="modern-checkout">
          <div><small>Total da recarga</small><strong>{money(selected)}</strong><span>{planBonus(selected)}</span></div>
          <button className="primary" type="submit">Continuar para Pix <span>→</span></button>
        </div>
      </form>

      <section className="operator-trust-row">
        <div><b>Confira os dados</b><span>Verifique o telefone, a operadora e o valor antes do pagamento.</span></div>
        <div><b>Plataforma independente</b><span>Não representa as operadoras de telefonia.</span></div>
        <div><b>Atendimento</b><span>atendimento@sygmasolucoes.com.br</span></div>
      </section>

      <section id="duvidas" className="faq operator-faq">
        <span className="eyebrow">DÚVIDAS FREQUENTES</span>
        <h2>Sobre sua recarga {operator.name}.</h2>
        {['Posso recarregar o celular de outra pessoa?','Preciso criar uma conta?','Quais valores estão disponíveis?','Como faço o pagamento?'].map((q, i) => <div className={`faq-row ${faq === i ? 'open' : ''}`} key={q}>
          <button onClick={() => setFaq(faq === i ? null : i)}><span>{q}</span><b>{faq === i ? '−' : '+'}</b></button>
          {faq === i && <p>{i === 0 ? `Sim. Basta informar o número ${operator.name} que receberá a recarga.` : i === 1 ? 'Não. O fluxo de recarga não exige criação de conta.' : i === 2 ? 'Os valores disponíveis são apresentados nesta página; confirme o resumo antes de pagar.' : 'O pagamento é realizado via Pix, após a conferência dos dados.'}</p>}
        </div>)}
      </section>
    </main>
    <Footer/>
  </>;
}

function PaymentPage() {
  const saved = useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem('recargaData') || '{}'); }
    catch { return {}; }
  }, []);
  const operator = operators[saved.operator];
  const amount = Number(saved.amount);
  const selectedBonus = saved.bonus || planBonus(amount);
  const phoneDigits = onlyDigits(String(saved.phone || ''));
  const [pix, setPix] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!operator || !values.includes(amount) || phoneDigits.length !== 11 || phoneDigits[2] !== '9') {
      setError('Os dados desta solicitação não são válidos. Volte e revise o número e o valor.');
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch('/api/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, operator: operator.slug, phone: phoneDigits })
    }).then(async response => {
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.success) throw new Error(data.message || 'O pagamento está indisponível no momento.');
      if (!cancelled) setPix(data.data);
    }).catch(() => {
      if (!cancelled) setError('Não foi possível iniciar o pagamento. Nenhuma cobrança foi confirmada. Tente novamente mais tarde ou fale com o atendimento.');
    }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('qr-code');
    if (canvas && pix?.paymentData?.copyPaste) QRCode.toCanvas(canvas, pix.paymentData.copyPaste, { width: 220, margin: 1 }).catch(() => {});
  }, [pix]);
  const copy = async () => {
    if (!pix?.paymentData?.copyPaste) return;
    try {
      await navigator.clipboard.writeText(pix.paymentData.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Não foi possível copiar o código. Selecione e copie o código Pix manualmente.');
    }
  };

  if (!operator) return <><Header/><main className="payment-page"><section className="payment-card"><h1>Solicitação inválida</h1><p>Volte à página inicial e inicie uma nova solicitação.</p><button className="secondary" onClick={() => go('/')}>Voltar ao início</button></section></main><Footer/></>;
  return <><Header/><main className="payment-page">
    <button className="back" onClick={() => go(`/recarga-${operator.slug}`)}>← Voltar e editar</button>
    <div className="payment-layout">
      <section className="payment-card">
        <div className="payment-header"><span className="eyebrow">REVISÃO DO PAGAMENTO</span><h1>Pagamento via Pix</h1><p>Confira o resumo ao lado antes de pagar.</p></div>
        {loading && <div className="loading"><span className="spinner"/> Preparando pagamento...</div>}
        {error && <div className="api-error" role="alert"><strong>Pagamento indisponível</strong><p>{error}</p><button className="secondary" onClick={() => window.location.reload()}>Tentar novamente</button></div>}
        {pix && <><div className="qr-wrap"><canvas id="qr-code"/><span>Abra o aplicativo do seu banco e escaneie o código.</span></div>
          <div className="pix-copy"><label htmlFor="pix-code">Código Pix copia e cola</label><div><input id="pix-code" readOnly value={pix.paymentData.copyPaste}/><button onClick={copy}>{copied ? 'Copiado!' : 'Copiar'}</button></div></div>
          <div className="waiting">A confirmação depende do processamento do pagamento.</div></>}
      </section>
      <aside className="order-summary"><span className="eyebrow">RESUMO DA SOLICITAÇÃO</span>
        <div className="summary-operator"><img src={operator.logo} alt=""/><div><strong>Recarga {operator.name}</strong><small>{saved.phone}</small></div></div>
        <div className="summary-line"><span>Número</span><strong>{saved.phone}</strong></div>
        <div className="summary-line"><span>Valor</span><strong>{money(amount)}</strong></div>
        <div className="summary-line bonus-line"><span>Bônus indicado</span><strong>{selectedBonus}</strong></div>
        <div className="summary-line"><span>Pagamento</span><strong>Pix</strong></div><hr/>
        <div className="summary-total"><span>Total</span><strong>{money(amount)}</strong></div>
        <p>Antes de pagar, confira cuidadosamente o número e a operadora. A recarga poderá não ser reversível após o processamento.</p>
      </aside>
    </div>
  </main><Footer/></>;
}
function App() { const [, refresh] = useState(0); useEffect(() => { const fn = () => refresh(x => x + 1); window.addEventListener('popstate', fn); return () => window.removeEventListener('popstate', fn); }, []); const p = path().replace(/\.html$/, ''); if (p === '/pagamento') return <PaymentPage/>; if (p.startsWith('/recarga-')) { const slug = p.replace('/recarga-', ''); if (operators[slug]) return <OperatorPage operator={operators[slug]}/>; } if (p === '/') return <Home/>; return <><Header/><main className="payment-page"><section className="payment-card"><h1>Página não encontrada</h1><p>Confira o endereço ou volte ao início.</p><button className="secondary" onClick={() => go('/')}>Ir para o início</button></section></main><Footer/></>; }

createRoot(document.getElementById('root')).render(<App/>);
