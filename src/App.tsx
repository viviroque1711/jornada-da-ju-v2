import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, Heart, Copy, Check,
  Menu, X, MessageCircle, ShieldCheck, Volume2, VolumeX
} from "lucide-react";
import { campaign, storySections, voiceQuotes, campaignNeeds, faithDecision } from "./content";

type Page = "home" | "historia" | "jornada" | "ajudar";

function getPage(): Page {
  const route = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  if (route === "minha-historia") return "historia";
  if (route === "minha-jornada") return "jornada";
  if (route === "como-ajudar") return "ajudar";
  return "home";
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label"><span />{children}</div>;
}

function Header({ page }: { page: Page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [page]);
  return (
    <header className="topbar">
      <a className="roque-brand roque-brand-header" href="https://roquebusinessevolution.com/" target="_blank" rel="noreferrer" aria-label="Roque Business Evolution">
        <img src="/jornada-da-ju-v2/images/roque-business-evolution.svg" alt="Roque Business Evolution"/>
      </a>
      <a className="site-wordmark" href="#/" aria-label="Viva a Vida, Juliana">VIVA A VIDA <span>· JULIANA</span></a>
      <button className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
      <nav className={menuOpen ? "nav nav-open" : "nav"}>
        <a href="#/">Início</a>
        <a href="#/minha-historia">Minha história</a>
        <a href="#/minha-jornada">Minha jornada</a>
        <a className="nav-cta" href="#/como-ajudar">Como ajudar <ArrowUpRight size={15}/></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <a className="roque-brand roque-brand-footer" href="https://roquebusinessevolution.com/" target="_blank" rel="noreferrer" aria-label="Roque Business Evolution — conhecer a empresa">
        <img src="/jornada-da-ju-v2/images/roque-business-evolution.svg" alt="Roque Business Evolution"/>
      </a>
      <div className="footer-center">
        <p>Uma história real. Uma corrente de solidariedade.</p>
        <a className="footer-whatsapp" href="https://wa.me/5511973967161" target="_blank" rel="noreferrer"><MessageCircle size={15}/> Fale conosco pelo WhatsApp</a>
      </div>
      <div className="footer-credit">
        <span>DESENVOLVIDO POR</span>
        <a href="https://roquebusinessevolution.com/" target="_blank" rel="noreferrer">ROQUE BUSINESS EVOLUTION</a>
      </div>
    </footer>
  );
}

function HomePage() {
  const [active, setActive] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  function toggleHeroSound() {
    const video = heroVideoRef.current;
    if (!video) return;

    // Desmutar diretamente no gesto do usuário: o vídeo já está em reprodução.
    // Evita chamar play() desnecessariamente e perder a autorização de áudio do navegador.
    const nextMuted = !video.muted;
    video.volume = 1;
    video.muted = nextMuted;
    setSoundEnabled(!nextMuted);

    // Só solicita play quando o vídeo realmente estiver pausado.
    if (video.paused) {
      void video.play().catch(() => {
        video.muted = true;
        setSoundEnabled(false);
      });
    }
  }
  const [pixCopied, setPixCopied] = useState(false);
  async function copyHomePix() {
    try {
      await navigator.clipboard.writeText(campaign.pix.copyPasteCode);
      setPixCopied(true);
    } catch {
      const field = document.createElement("textarea");
      field.value = campaign.pix.copyPasteCode;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      setPixCopied(ok);
    }
    window.setTimeout(() => setPixCopied(false), 2400);
  }
  const milestones = [
    { title: "Câncer de mama", detail: "A primeira batalha. Cirurgia, tratamento e um recomeço." },
    { title: "Intestino e vesícula", detail: "Cerca de dez anos depois, novos diagnósticos mudaram novamente o caminho." },
    { title: "Quatro tumores no fígado", detail: "Quando a remissão parecia próxima, veio outra notícia." },
    { title: "Pâncreas, vias biliares e pulmão", detail: "Novos desafios, complicações e a continuidade do tratamento." },
    { title: "A cura", detail: "É a certeza que carrego: é o futuro pelo qual sigo lutando e vou vencer. Com fé, cuidado e apoio, você pode ajudar." }
  ];
  return (
    <>
      <section className="home-hero" id="inicio">
        <div className="home-hero-content">
          <div className="home-hero-copy">
            <SectionLabel>UMA HISTÓRIA DE FÉ, CORAGEM E VIDA</SectionLabel>
            <h1>Uma história <em>de superação.</em></h1>
            <p className="home-lead">A Juliana continua sua jornada, enfrentando desafios e escolhendo viver. E você também pode fazer parte dessa história.</p>
          </div>
          <div className="home-hero-media">
            <video ref={heroVideoRef} autoPlay muted={!soundEnabled} loop playsInline preload="auto" aria-label="Vídeo de Juliana. Toque no ícone de alto-falante para ativar o áudio.">
              <source src={campaign.video.src} type="video/mp4"/>
            </video>
            <button className="hero-speaker-toggle" type="button" onClick={toggleHeroSound} aria-label={soundEnabled ? "Desativar som" : "Ativar som"} title={soundEnabled ? "Desativar som" : "Ativar som"}>
              {soundEnabled ? <Volume2 size={19} strokeWidth={2}/> : <VolumeX size={19} strokeWidth={2}/>}
            </button>
          </div>
          <div className="home-hero-actions">
            <a className="button button-gold" href="#/como-ajudar">COMO AJUDAR <ArrowUpRight size={16}/></a>
            <a className="button button-outline" href="#/minha-historia">MINHA HISTÓRIA <ArrowUpRight size={16}/></a>
            <a className="button button-outline" href="#/minha-jornada">MINHA JORNADA <ArrowUpRight size={16}/></a>
          </div>
        </div>
        <div className="home-hero-bottom"><span>VIVA A VIDA, JULIANA</span><span>01 / 02</span></div>
      </section>

      <section className="home-timeline" id="jornada-resumo">
        <div className="home-timeline-heading">
          <SectionLabel>UM CAMINHO DE MUITOS RECOMEÇOS</SectionLabel>
          <h2>Minha jornada,<br/><em>em cinco momentos.</em></h2>
          <p>Conheça alguns dos capítulos que marcaram essa caminhada. Selecione cada etapa para descobrir um pouco mais.</p>
        </div>
        <div className="ascending-timeline" aria-label="Linha do tempo interativa da jornada de Juliana">
          <div className="timeline-rail" aria-hidden="true"/>
          {milestones.map((item, index) => (
            <button
              key={item.title}
              className={active === index ? "milestone milestone-active" : "milestone"}
              style={{ "--milestone-index": index } as CSSProperties}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <span className="milestone-dot">{String(index + 1).padStart(2, "0")}</span>
              <span className="milestone-title">{item.title}</span>
              <span className="milestone-detail">{active === index ? item.detail : "Toque para conhecer"}</span>
            </button>
          ))}
        </div>
        <div className="timeline-mobile-detail" aria-live="polite">
          <strong>{milestones[active].title}</strong>
          <p>{milestones[active].detail}</p>
        </div>
        {active === 4 && <div className="timeline-pix-link-wrap"><button className="timeline-pix-link" type="button" onClick={copyHomePix}>{pixCopied ? "CÓDIGO PIX COPIADO" : "VOCÊ PODE AJUDAR FAZENDO UM PIX"} {pixCopied ? <Check size={15}/> : <Copy size={15}/>}</button></div>}
      </section>

      <section className="home-pix" id="pix">
        <div className="home-pix-inner">
          <header className="home-pix-heading">
            <h2>A história da Juliana continua<span>...</span></h2>
            <p>E você pode fazer parte do próximo capítulo<span>...</span></p>
            <strong>A CURA É A NOSSA ESPERANÇA. SUA AJUDA É BEM-VINDA.</strong>
          </header>
          <div className="home-pix-content">
            <div className="home-pix-qr-wrap">
              <img src={campaign.pix.qrImage} alt="QR Code Pix da campanha Viva a Vida, Juliana."/>
              <span>APONTE A CÂMERA DO CELULAR</span>
            </div>
            <div className="home-pix-copy">
              <SectionLabel>PIX — VALOR LIVRE</SectionLabel>
              <h3>Faça parte dessa corrente.</h3>
              <p>Contribua com o valor que estiver ao seu alcance. Cada gesto será recebido com gratidão.</p>
              <div className="home-pix-beneficiary">
                <small>RESPONSÁVEL PELO RECEBIMENTO</small>
                <strong>{campaign.pix.beneficiaryDisplayName}</strong>
                <span>Pix · valor livre</span>
              </div>
              <button className="button button-gold" type="button" onClick={copyHomePix}>
                {pixCopied ? <Check size={16}/> : <Copy size={16}/>}
                {pixCopied ? "CÓDIGO PIX COPIADO" : "COPIAR CÓDIGO PIX"}
              </button>
              <small className="home-pix-security">Antes de confirmar, confira se o beneficiário exibido pelo seu banco é {campaign.pix.beneficiaryDisplayName}.</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HistoryPage() {
  const [activeQuote, setActiveQuote] = useState<number | null>(null);
  const intro = storySections[0];
  return (
    <div className="inner-page">
      <section className="inner-page-heading">
        <SectionLabel>MINHA HISTÓRIA</SectionLabel>
        <h1>Antes de cada diagnóstico,<br/><em>existe uma vida inteira.</em></h1>
        <p>Quero que você conheça a mulher, os sonhos e a fé que fazem parte de quem eu sou.</p>
      </section>
      <section className="history-intro section-pad">
        <img src={intro.image} alt={intro.imageAlt}/>
        <div>
          <SectionLabel>01 — QUEM EU SOU</SectionLabel>
          <h2>{intro.title}</h2>
          {intro.paragraphs.map((p) => <p className="body-copy" key={p}>{p}</p>)}
          <p className="signature">Com carinho,<br/><strong>Juliana</strong></p>
        </div>
      </section>
      <section className="faith-commitment">
        <div className="faith-inner">
          <SectionLabel>MINHA FÉ, MINHA DECISÃO</SectionLabel>
          <h2>{faithDecision.title}</h2>
          {faithDecision.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <span className="faith-signature">— JULIANA</span>
        </div>
      </section>
      <section className="voice-wall">
        <div className="voice-inner">
          <SectionLabel>PALAVRAS QUE SÃO MINHAS</SectionLabel>
          <h2>Minha fé. Minha voz.<br/><em>Meu jeito de seguir.</em></h2>
          <p className="voice-intro">Cada uma dessas frases guarda um pedaço da minha caminhada. Toque em cada uma para conhecer o que ela representa para mim.</p>
          <div className="voice-grid">
            {voiceQuotes.map((item, index) => (
              <article className={activeQuote === index ? "voice-card voice-card-open" : "voice-card"} key={item.phrase}>
                <button className="voice-card-trigger" type="button" aria-expanded={activeQuote === index} onClick={() => setActiveQuote(activeQuote === index ? null : index)}>
                  <span className="voice-card-number">0{index + 1}</span>
                  <span className="voice-card-phrase">“{item.phrase}”</span>
                  <span className="voice-card-action">{activeQuote === index ? "FECHAR" : "TOQUE PARA EXPLORAR"} <span>{activeQuote === index ? "−" : "+"}</span></span>
                </button>
                {activeQuote === index && <div className="voice-card-detail"><p>{item.detail}</p></div>}
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="inner-page-next"><a className="button button-gold" href="#/minha-jornada">CONHEÇA MINHA JORNADA <ArrowUpRight size={16}/></a></div>
    </div>
  );
}

function JourneyPage() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="inner-page">
      <section className="inner-page-heading">
        <SectionLabel>MINHA JORNADA</SectionLabel>
        <h1>Uma vida de capítulos.<br/><em>Muitas razões para continuar.</em></h1>
        <p>Vou contar, com minhas palavras, alguns dos momentos que marcaram esse caminho.</p>
      </section>
      <section className="journey section-pad">
        <div className="story-chapters">
          {storySections.slice(1).map((chapter, index) => (
            <motion.article className={index % 2 === 0 ? "story-chapter" : "story-chapter reverse"} key={chapter.id} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .65 }}>
              <div className="chapter-hook">
                <span className="chapter-number">{chapter.number}</span>
                <span className="timeline-kicker">{chapter.kicker}</span>
                <h2>{chapter.title}</h2>
              </div>
              <figure className="story-image">
                <img src={chapter.image} alt={chapter.imageAlt} loading="lazy"/>
                <figcaption>{chapter.imageCaption}</figcaption>
              </figure>
              <div className="chapter-copy">{chapter.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            </motion.article>
          ))}
        </div>
      </section>
      <section className="journey-video">
        <video autoPlay muted loop playsInline preload="metadata" poster={campaign.video.poster}>
          <source src={campaign.video.src} type="video/mp4"/>
        </video>
        <div><SectionLabel>{campaign.video.eyebrow}</SectionLabel><h2>{campaign.video.headline}</h2><p>{campaign.video.caption}</p></div>
      </section>
      <div className="inner-page-next"><a className="button button-gold" href="#/como-ajudar">COMO VOCÊ PODE FAZER PARTE <ArrowUpRight size={16}/></a></div>
    </div>
  );
}

function HelpPage() {
  const [copied, setCopied] = useState(false);
  async function copyPix() {
    try {
      await navigator.clipboard.writeText(campaign.pix.copyPasteCode);
      setCopied(true);
    } catch {
      const field = document.createElement("textarea");
      field.value = campaign.pix.copyPasteCode;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      setCopied(ok);
    }
    window.setTimeout(() => setCopied(false), 2400);
  }
  return (
    <div className="inner-page help-page">
      <section className="inner-page-heading">
        <SectionLabel>VOCÊ TAMBÉM PODE FAZER PARTE</SectionLabel>
        <h1>Uma esperança que<br/><em>podemos construir juntos.</em></h1>
        <p>Cada gesto de carinho, cada contribuição e cada pessoa que caminha ao lado da Juliana fortalece essa jornada.</p>
      </section>
      <section className="support section-pad">
        <div className="support-heading">
          <SectionLabel>UMA CORRENTE DE SOLIDARIEDADE</SectionLabel>
          <h2>Há momentos em que aceitar ajuda também é <em>coragem.</em></h2>
          <p>{campaignNeeds.purpose}</p>
          <p>{campaignNeeds.inspiration}</p>
          <p>{campaignNeeds.request}</p>
        </div>
        <div className="support-points">
          <div><Heart/><h3>Sua ajuda importa</h3><p>Se estiver ao seu alcance, qualquer contribuição será recebida com gratidão.</p></div>
          <div><MessageCircle/><h3>Compartilhe</h3><p>Ajude minha história a chegar a quem pode caminhar comigo.</p></div>
          <div><ShieldCheck/><h3>Esteja comigo</h3><p>Um gesto de carinho ou uma mensagem de esperança também fazem diferença.</p></div>
        </div>
      </section>
      <section className="donate" id="contribuir">
        <div className="donate-inner">
          <SectionLabel>SUA SOLIDARIEDADE FAZ PARTE DA MINHA HISTÓRIA</SectionLabel>
          <h2>Se puder, caminhe<br/><em>um trecho comigo.</em></h2>
          <p>Se estiver ao seu alcance, você pode contribuir com qualquer valor pelo Pix. Cada gesto será recebido com gratidão. O recebimento é feito pela minha mãe, Lourdes Aparecida Batista, que está responsável por esta arrecadação.</p>
          <div className="pix-panel">
            <div className="pix-visual"><img className="pix-qr" src={campaign.pix.qrImage} alt="QR Code Pix da campanha Viva a Vida, Juliana."/><span>APONTE A CÂMERA DO CELULAR</span></div>
            <div className="pix-details">
              <span className="timeline-kicker">PIX — VALOR LIVRE</span><h3>Sua ajuda, do seu jeito.</h3>
              <p>Leia o QR Code ou copie o código Pix. Antes de confirmar, confira se o nome exibido pelo seu banco é <strong>{campaign.pix.beneficiaryDisplayName}</strong>.</p>
              <div className="beneficiary"><small>RESPONSÁVEL PELO RECEBIMENTO</small><strong>{campaign.pix.beneficiaryDisplayName}</strong><span>Chave Pix aleatória · valor livre</span></div>
              <button className="button button-gold" onClick={copyPix}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "CÓDIGO PIX COPIADO" : "COPIAR CÓDIGO PIX"}</button>
              <small className="security-note">Depois de copiar, abra o aplicativo do seu banco, escolha Pix Copia e Cola, confira os dados e confirme somente se o beneficiário estiver correto.</small>
            </div>
          </div>
          <a className="share-link" href="https://wa.me/?text=Quero%20compartilhar%20a%20campanha%20Viva%20a%20Vida%2C%20Juliana!%20Conhe%C3%A7a%20a%20hist%C3%B3ria%20e%20fa%C3%A7a%20parte%20dessa%20corrente." target="_blank" rel="noreferrer"><MessageCircle size={18}/> COMPARTILHAR MINHA HISTÓRIA <ArrowUpRight size={15}/></a>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage);
  useEffect(() => {
    const sync = () => { setPage(getPage()); window.scrollTo({ top: 0, behavior: "auto" }); };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return (
    <main className="site-shell">
      <Header page={page}/>
      {page === "home" && <HomePage/>}
      {page === "historia" && <HistoryPage/>}
      {page === "jornada" && <JourneyPage/>}
      {page === "ajudar" && <HelpPage/>}
      <Footer/>
    </main>
  );
}
