import { useEffect, useState } from "react";
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
    status: "Exploring",
    className: "agent",
  },
  {
    number: "02",
    name: "NESI Build",
    category: "IDEAS INTO THINGS",
    description:
      "A focused space to move from a rough idea to a working prototype without losing the thread.",
    icon: Layers3,
    status: "On the roadmap",
    className: "build",
  },
  {
    number: "03",
    name: "NESI Connect",
    category: "YOUR WORLD, IN SYNC",
    description:
      "A future layer for connecting models, apps, and devices without stitching every workflow together by hand.",
    icon: AudioWaveform,
    status: "On the roadmap",
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

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="home">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
            <a href="#vision" onClick={closeMenu}>The idea</a>
            <a href="#ecosystem" onClick={closeMenu}>Ecosystem</a>
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
          <h1 id="hero-title">Intelligence,<br /><em>in motion.</em></h1>
          <p className="hero-copy">
            A calmer, more connected way to work with AI.
            Built around your ideas, your tools, and your control.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#vision">Discover NESI <ArrowDownRight size={17} /></a>
            <a className="text-link" href="#ecosystem">Explore the ecosystem <ArrowRight size={16} /></a>
          </div>
          <div className="hero-note">
            <Waves size={16} strokeWidth={1.5} />
            <span>Look beyond the surface.</span>
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
            <h2>AI shouldn't be<br />another <span>place to go.</span></h2>
            <div className="intro-copy-row">
              <p className="large-copy">
                The world doesn't need another hundred disconnected AI tabs. It needs thoughtful tools that work together and help people move from <em>“what if?”</em> to <em>“it's done.”</em>
              </p>
              <p className="support-copy">
                NESI is an independent project exploring what that future could look like: useful intelligence, connected experiences, and technology that leaves the steering wheel in your hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ecosystem section-pad" id="ecosystem">
        <div className="page-width">
          <div className="section-heading" data-reveal>
            <div>
              <div className="section-kicker"><span className="kicker-line" /> A CONNECTED ECOSYSTEM</div>
              <h2>Different tools.<br /><span>One clearer direction.</span></h2>
            </div>
            <p>Not a pile of features. A set of focused experiences designed to make the pieces fit together.</p>
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
            <h2>Depth over noise.<br /><span>Progress over hype.</span></h2>
            <p>Our north star is simple: technology should give people more agency, not more things to manage.</p>
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
          <h2>Good ideas travel<br /><em>further together.</em></h2>
          <p>We're at the beginning. If you're curious about what NESI could become, we'd like to hear from you.</p>
          <a className="button button-light" href="mailto:hello@nesi.ai?subject=Hello%20NESI">
            Start a conversation <ArrowUpRight size={17} />
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
