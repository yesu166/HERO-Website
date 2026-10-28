import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioWaveform,
  Check,
  ChevronDown,
  Command,
  Fingerprint,
  Layers3,
  Menu,
  Orbit,
  Sparkles,
  Waves,
  X,
} from "lucide-react";
import "./styles.css";

const products = [
  {
    number: "01",
    name: "NESI Agent",
    category: "WORK, CONNECTED",
    description:
      "Turn a goal into a plan, coordinate your tools, and get useful work done with you in control.",
    icon: Orbit,
    status: "In development",
    className: "agent",
  },
  {
    number: "02",
    name: "NESI Build",
    category: "IDEAS INTO THINGS",
    description:
      "A focused space to move from a rough idea to a working prototype without losing the thread.",
    icon: Layers3,
    status: "Concept",
    className: "build",
  },
  {
    number: "03",
    name: "NESI Connect",
    category: "YOUR WORLD, IN SYNC",
    description:
      "A future layer for connecting models, apps, and devices without stitching every workflow together by hand.",
    icon: AudioWaveform,
    status: "Concept",
    className: "connect",
  },
];

const principles = [
  {
    number: "01",
    title: "Useful over impressive",
    description:
      "Technology should make a real task easier. We care more about the finished work than a dazzling demo.",
    icon: Check,
  },
  {
    number: "02",
    title: "You stay in control",
    description:
      "Clear permissions, understandable costs, and human approval where it matters. No mystery machinery.",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Connected by design",
    description:
      "AI should fit into the tools and habits people already have, not force them into another isolated island.",
    icon: Command,
  },
];

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="NESI home">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-name">nesi<span>.</span></span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signalAwake, setSignalAwake] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const range = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--scroll-progress", String(range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="home">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <div className="header-signal"><span /> SOMETHING IS SURFACING</div>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav id="primary-navigation" className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
            <a href="#vision" onClick={closeMenu}>The signal</a>
            <a href="#reveal" onClick={closeMenu}>Meet NESI</a>
            <a href="#principles" onClick={closeMenu}>Our principles</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Get in touch <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-landscape" aria-hidden="true">
          <div className="moon-glow" />
          <div className="mountain mountain-back" />
          <div className="mountain mountain-front" />
          <div className="lake-surface" />
          <div className="lake-reflection" />
          <div className="shoreline" />
        </div>
        <div className="hero-content page-width">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> AN INDEPENDENT AI STUDIO</div>
          <p className="hero-pretitle">A note from beneath the noise</p>
          <h1 id="hero-title">Something has been<br /><em>under the surface.</em></h1>
          <p className="hero-copy">Everyone is racing to make AI louder.<br className="desktop-break" /> We went looking for what was missing.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#vision">Follow the signal <ArrowDownRight size={17} /></a>
            <span className="hero-aside">A different kind of intelligence<br />is beginning to take shape.</span>
          </div>
          <div className="hero-note">
            <Waves size={16} strokeWidth={1.5} />
            <span>Nothing stays hidden forever.</span>
          </div>
        </div>
        <a className="scroll-cue" href="#vision" aria-label="Scroll to the next section">
          <span>SCROLL TO EXPLORE</span><ChevronDown size={15} />
        </a>
      </section>

      <section className="intro section-pad" id="vision">
        <div className="page-width intro-grid">
          <div className="section-kicker" data-reveal>
            <span className="kicker-line" /> THE IDEA
          </div>
          <div className="intro-main" data-reveal>
            <h2>The world kept adding intelligence.<br /><span>It forgot to connect it.</span></h2>
            <div className="intro-copy-row">
              <p className="large-copy">
                A new model. Another app. One more tab. The future kept arriving in pieces. The tools got impressive, but the space between them stayed frustrating.
              </p>
              <p className="support-copy">
                So we went looking for what was missing: a connective layer between what you mean and what needs doing, built around people rather than hype.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="descent section-pad" id="descent">
        <div className="descent-background" aria-hidden="true"><div className="descent-haze" /><div className="descent-rings" /></div>
        <div className="page-width descent-content" data-reveal>
          <p className="section-kicker"><span className="kicker-line" /> CHAPTER 02 · THE DESCENT</p>
          <h2>So we stopped<br />looking at the surface.</h2>
          <p className="descent-copy">What if AI wasn't another destination? What if it could become the connective layer between what you mean and what needs doing?</p>
          <p className="descent-small">LESS PROMPT CHASING. MORE FOLLOW-THROUGH.</p>
          <a className="quiet-link" href="#reveal">Keep going. There's something here <ArrowRight size={15} /></a>
        </div>
        <span className="descent-coordinate" aria-hidden="true">SIGNAL FOUND / 02</span>
      </section>
      <section className={signalAwake ? "reveal-section signal-awake" : "reveal-section"} id="reveal">
        <div className="reveal-art" aria-hidden="true"><div className="reveal-halo halo-one" /><div className="reveal-halo halo-two" /><div className="reveal-halo halo-three" /><div className="reveal-creature"><span /></div><div className="reveal-waterline" /><div className="reveal-particles"><i /><i /><i /><i /><i /><i /><i /></div></div>
        <div className="page-width reveal-content" data-reveal>
          <p className="section-kicker"><span className="kicker-line" /> CHAPTER 03 · THE EMERGENCE</p>
          <p className="reveal-overline">THE SIGNAL HAS A NAME</p>
          <h2 className="reveal-word" aria-label="NESI">NESI<span>.</span></h2>
          <div className="reveal-bottom">
            <h3>It was never about<br />making more noise.</h3>
            <div>
              <p>NESI is an independent AI studio exploring a more connected way to work with intelligence. Not another island of tools, but a direction toward systems that work together while people stay in control.</p>
              <button className="button button-outline" type="button" onClick={() => setSignalAwake(true)} aria-pressed={signalAwake}>{signalAwake ? "Signal acknowledged" : "Bring the signal to life"} {signalAwake ? <Check size={16} /> : <ArrowUpRight size={16} />}</button>
            </div>
          </div>
          <div className="reveal-footnote"><span>NOT A FINISHED PROMISE.</span><span>A DIRECTION WE'RE BUILDING TOWARD.</span></div>
        </div>
      </section>
      <section className="ecosystem section-pad" id="ecosystem">
        <div className="page-width">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker"><span className="kicker-line" /> THE FIRST WAVE</div>
              <h2>A big idea starts.<br /><span>With one useful thing.</span></h2>
            </div>
            <p>NESI is a journey, not a catalogue of imaginary products. Here is the first focus and what remains a future direction.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <article className={`product-card ${product.className}`} key={product.number} data-reveal>
                  <div className="product-topline">
                    <span>{product.number} / 03</span>
                    <span className="product-icon"><Icon size={19} strokeWidth={1.5} /></span>
                  </div>
                  <div className="product-art" aria-hidden="true">
                    <div className="art-orbit orbit-a" />
                    <div className="art-orbit orbit-b" />
                    <div className="art-core"><Icon size={34} strokeWidth={1.2} /></div>
                    <div className="art-spark art-spark-a" />
                    <div className="art-spark art-spark-b" />
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-status"><span /> {product.status}</div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="ecosystem-note" data-reveal>
            <Sparkles size={15} /> These are product directions, not claims of released features. We're building with intention, one useful thing at a time.
          </p>
        </div>
      </section>

      <section className="manifesto section-pad" id="principles">
        <div className="page-width manifesto-grid">
          <div className="manifesto-heading" data-reveal>
            <div className="section-kicker"><span className="kicker-line" /> WHAT WE BELIEVE</div>
            <h2>Depth over hype.<br /><span>Agency over automation.</span></h2>
            <p>The best technology gives people more room to think, make, and decide. Everything else is details.</p>
            <div className="manifesto-stamp"><Waves size={20} /><span>BUILT WITH INTENTION</span></div>
          </div>
          <div className="principle-list">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article className="principle" key={principle.number} data-reveal>
                  <span className="principle-number">{principle.number}</span>
                  <div className="principle-icon"><Icon size={18} strokeWidth={1.7} /></div>
                  <div className="principle-copy">
                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </div>
                  <ArrowUpRight className="principle-arrow" size={17} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-panel page-width" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-kicker"><span className="kicker-line" /> THE NEXT CHAPTER</div>
          <h2>The lake was quiet.<br /><em>That does not mean it was empty.</em></h2>
          <p>We are bringing the first signal into the open, one useful piece at a time. Curious builders and thoughtful collaborators are welcome here.</p>
          <a className="button button-light" href="https://github.com/yesu166/NESI-Agentic-AI" target="_blank" rel="noreferrer">
            Explore the foundations <ArrowUpRight size={17} />
          </a>
          <span className="contact-orbit orbit-one" aria-hidden="true" />
          <span className="contact-orbit orbit-two" aria-hidden="true" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <BrandMark />
          <p>Independent by nature. Curious by design.</p>
          <span className="copyright">© {new Date().getFullYear()} NESI Studio</span>
        </div>
      </footer>
    </main>
  );
}

export default App;

// Vite loads this file as the browser entry point. Unit tests can import App without a #root node.
const mount = document.getElementById("root");
if (mount) {
  createRoot(mount).render(<App />);
}
