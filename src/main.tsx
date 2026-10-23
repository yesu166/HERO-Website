import { useEffect, useRef } from "react";
import { ArrowUpRight, MoveDown, Sparkles } from "lucide-react";
import "./styles.css";

type FlightState = "following" | "landing" | "perched" | "taking-off";

function ButterflyCursor() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return;

    let raf = 0;
    let x = window.innerWidth * 0.5;
    let y = window.innerHeight * 0.5;
    let targetX = x;
    let targetY = y;
    let previousX = x;
    let previousY = y;
    let lastAngle = 0;
    let state: FlightState = "following";
    let landFromX = x;
    let landFromY = y;
    let landToX = x;
    let landToY = y;
    let landStart = 0;
    let perchedAt = 0;
    let takeoffStart = 0;
    let takeoffFromX = x;
    let takeoffFromY = y;
    let inside = false;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    const setVisible = (visible: boolean) => {
      root.style.opacity = visible ? "1" : "0";
      root.setAttribute("aria-hidden", visible ? "false" : "true");
    };

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;

      if (!inside) {
        inside = true;
        x = targetX;
        y = targetY;
      }
      if (state === "perched") {
        state = "taking-off";
        takeoffStart = performance.now();
        takeoffFromX = x;
        takeoffFromY = y;
      }
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      inside = true;
      x = event.clientX;
      y = event.clientY;
      targetX = x;
      targetY = y;
      previousX = x;
      previousY = y;
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const pointerLeave = () => {
      inside = false;
      setVisible(false);
    };

    const click = (event: MouseEvent) => {
      const hero = document.querySelector<HTMLElement>(".hero");
      if (!hero || !hero.contains(event.target as Node)) return;
      const rect = hero.getBoundingClientRect();
      landFromX = x;
      landFromY = y;
      landToX = clamp(event.clientX, rect.left + 12, rect.right - 12);
      landToY = clamp(event.clientY, rect.top + 12, rect.bottom - 12);
      targetX = landToX;
      targetY = landToY;
      landStart = performance.now();
      state = "landing";
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    function tick(now: number) {
      raf = 0;
      if (!inside || document.visibilityState === "hidden") return;

      let desiredX = targetX;
      let desiredY = targetY;

      if (state === "landing") {
        const progress = clamp((now - landStart) / 560, 0, 1);
        const eased = easeOutCubic(progress);
        desiredX = landFromX + (landToX - landFromX) * eased;
        desiredY = landFromY + (landToY - landFromY) * eased - Math.sin(progress * Math.PI) * 22;
        if (progress >= 1) {
          state = "perched";
          perchedAt = now;
          x = landToX;
          y = landToY;
        }
      } else if (state === "perched") {
        desiredX = landToX;
        desiredY = landToY;
      } else if (state === "taking-off") {
        const progress = clamp((now - takeoffStart) / 280, 0, 1);
        const eased = smoothstep(progress);
        desiredX = takeoffFromX + (targetX - takeoffFromX) * eased;
        desiredY = takeoffFromY + (targetY - takeoffFromY) * eased - Math.sin(progress * Math.PI) * 14;
        if (progress >= 1) state = "following";
      }

      if (state === "following" || state === "taking-off") {
        const factor = reducedMotion ? 1 : 0.105;
        x += (desiredX - x) * factor;
        y += (desiredY - y) * factor;
      } else if (state === "perched") {
        const hover = reducedMotion ? 0 : Math.sin((now - perchedAt) / 480) * 2.3;
        x = landToX;
        y = landToY + hover;
      } else {
        x = desiredX;
        y = desiredY;
      }

      const velocityX = x - previousX;
      const velocityY = y - previousY;
      const speed = Math.hypot(velocityX, velocityY);
      const angle = state === "perched"
        ? Math.sin(now / 680) * 3
        : clamp(Math.atan2(velocityY, velocityX) * 180 / Math.PI * 0.18, -18, 18);
      lastAngle += (angle - lastAngle) * (reducedMotion ? 1 : 0.12);
      const flap = reducedMotion ? 0 : Math.sin(now / 78) * 5.5 * clamp(speed / 3 + 0.2, 0.2, 1);
      const scale = state === "landing" ? 1 - Math.sin(clamp((now - landStart) / 560, 0, 1) * Math.PI) * 0.04 : 1;

      root.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${lastAngle}deg) scale(${scale})`;
      root.style.setProperty("--flap", `${flap}deg`);
      previousX = x;
      previousY = y;

      if (state !== "perched" || !reducedMotion) {
        raf = requestAnimationFrame(tick);
      }
    }

    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;
    hero.addEventListener("pointerenter", pointerEnter);
    hero.addEventListener("pointermove", pointerMove);
    hero.addEventListener("pointerleave", pointerLeave);
    hero.addEventListener("click", click);
    window.addEventListener("blur", pointerLeave);

    return () => {
      hero.removeEventListener("pointerenter", pointerEnter);
      hero.removeEventListener("pointermove", pointerMove);
      hero.removeEventListener("pointerleave", pointerLeave);
      hero.removeEventListener("click", click);
      window.removeEventListener("blur", pointerLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="butterfly-cursor" ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 160 160" className="butterfly-svg" role="presentation">
        <defs>
          <radialGradient id="wingL" cx="30%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#fff8ff" stopOpacity=".96" />
            <stop offset="45%" stopColor="#e7ccff" stopOpacity=".67" />
            <stop offset="100%" stopColor="#a6dfff" stopOpacity=".22" />
          </radialGradient>
          <radialGradient id="wingR" cx="68%" cy="28%" r="85%">
            <stop offset="0%" stopColor="#fff9ff" stopOpacity=".96" />
            <stop offset="48%" stopColor="#d8c0ff" stopOpacity=".63" />
            <stop offset="100%" stopColor="#a8ecff" stopOpacity=".20" />
          </radialGradient>
          <linearGradient id="vein" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fff" stopOpacity=".98" />
            <stop offset=".5" stopColor="#e4bfff" stopOpacity=".83" />
            <stop offset="1" stopColor="#a7edff" stopOpacity=".72" />
          </linearGradient>
          <filter id="butterflyGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 .48 0 1 0 0 .3 0 0 1 0 .78 0 0 0 .8 0" result="tint" />
            <feMerge><feMergeNode in="tint"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g filter="url(#butterflyGlow)" stroke="url(#vein)" strokeWidth="1.15" strokeLinejoin="round">
          <path className="wing wing-left" d="M79 78 C64 51 29 20 15 33 C3 47 23 76 48 91 C61 99 72 91 79 82 Z" fill="url(#wingL)" />
          <path className="wing wing-right" d="M81 78 C96 42 122 13 139 22 C155 33 143 67 118 86 C104 97 89 91 81 82 Z" fill="url(#wingR)" />
          <path className="wing wing-lower-left" d="M78 82 C57 87 41 97 43 116 C46 135 65 133 79 98 Z" fill="url(#wingL)" opacity=".9" />
          <path className="wing wing-lower-right" d="M83 82 C101 88 119 98 116 114 C112 133 95 129 81 98 Z" fill="url(#wingR)" opacity=".9" />
          <g fill="none" strokeWidth=".7" opacity=".68">
            <path d="M77 79 Q50 56 18 37 M76 83 Q49 84 31 65 M78 88 Q63 106 61 126" />
            <path d="M82 79 Q102 47 137 27 M83 83 Q112 82 137 58 M82 88 Q101 103 105 125" />
          </g>
          <path d="M80 75 C77 87 78 97 81 105" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M79 76 Q65 59 69 54 M81 76 Q95 57 94 51" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <circle cx="80" cy="75" r="3.2" fill="#fff9ff" stroke="none" />
        </g>
        <g className="butterfly-dust" fill="#f4ddff">
          <circle cx="20" cy="28" r="1.1"/><circle cx="138" cy="17" r=".9"/>
          <circle cx="145" cy="74" r="1.2"/><circle cx="27" cy="89" r=".8"/>
          <circle cx="57" cy="139" r="1"/><circle cx="112" cy="137" r=".9"/>
        </g>
      </svg>
      <span className="butterfly-aura" />
    </div>
  );
}

function App() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <main>
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-ambience" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <ButterflyCursor />
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Yesu home">YESU<span>°</span></a>
          <nav aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#work">Work</a>
            <a href="#experiments">Experiments</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> DIGITAL ARTIST / CREATIVE TECHNOLOGIST</div>
          <h1>Where Creativity<br />Meets <em>Technology.</em></h1>
          <p>I design and build immersive digital experiences at the intersection of art, code and artificial intelligence, crafting worlds that feel as considered as they look.</p>
          <a className="cta" href="#work"><span className="cta-icon"><ArrowUpRight size={22}/></span><span>View my work</span></a>
        </div>

        <div className="vertical-index" aria-label="Creative disciplines">
          <span>01 — AI</span><span>02 — 3D</span><span>03 — MOTION</span><span>04 — WEB</span>
        </div>

        <a className="scroll-hint" href="#process"><span className="scroll-rule" /><span>SCROLL TO EXPLORE</span><MoveDown size={13}/></a>
        <div className="hero-caption"><Sparkles size={13}/> An independent digital practice <span>·</span> 2026</div>
      </section>


      <section className="process section" id="process">
        <div className="section-kicker">01 / THE APPROACH</div>
        <h2>A little wonder.<br/><em>A lot of intention.</em></h2>
        <p className="section-lead">Good experiences make technology feel human. I move from a spark of curiosity to a real thing people can explore.</p>
        <div className="process-path" aria-label="Creative process">
          {[
            ["01", "Discover", "Ideas & Inspiration"],
            ["02", "Explore", "AI & Concepts"],
            ["03", "Build", "3D & Creative Code"],
            ["04", "Animate", "Motion & Interaction"],
            ["05", "Create", "Final Experience"],
          ].map(([number, title, subtitle]) => (
            <article className="process-step" key={number}>
              <span className="step-number">{number}</span>
              <div><h3>{title}</h3><p>{subtitle}</p></div>
              <span className="step-orb" />
            </article>
          ))}
        </div>
      </section>

      <section className="work section" id="work">
        <div className="section-kicker">02 / SELECTED WORKS</div>
        <h2>Things I've<br/><em>brought to life.</em></h2>
        <div className="work-grid">
          <a className="project project-wide" href="https://github.com/yesu166/HoneyChain-Hexanexus" target="_blank" rel="noreferrer">
            <div className="project-art art-honey"><span className="art-label">01 / APPLIED AI</span><div className="honey-orbit"><span>H</span></div><span className="art-code">TRACEABILITY / SYSTEM DESIGN</span></div>
            <div className="project-meta"><div><h3>HoneyChain</h3><p>Applied AI · Full-stack platform</p></div><span>2026 ↗</span></div>
          </a>
          <a className="project" href="https://github.com/yesu166/Web-Based-Drone-Simulator" target="_blank" rel="noreferrer">
            <div className="project-art art-drone"><span className="art-label">02 / SIMULATION</span><div className="drone-rings"><i/><i/><i/></div><span className="art-code">PHYSICS / SPATIAL SYSTEMS</span></div>
            <div className="project-meta"><div><h3>Drone Simulator</h3><p>Simulation · Creative engineering</p></div><span>2026 ↗</span></div>
          </a>
          <a className="project" href="https://github.com/yesu166/NESI-Agentic-AI" target="_blank" rel="noreferrer">
            <div className="project-art art-nesi"><span className="art-label">03 / AGENTIC SYSTEMS</span><div className="nesi-core"><span>N</span></div><span className="art-code">TOOLS / REASONING / MEMORY</span></div>
            <div className="project-meta"><div><h3>NESI</h3><p>Agentic AI · Workflow experiments</p></div><span>2026 ↗</span></div>
          </a>
          <a className="project" href="https://github.com/yesu166/Yesu-3D-Portfolio" target="_blank" rel="noreferrer">
            <div className="project-art art-web"><span className="art-label">04 / CREATIVE CODE</span><div className="web-geometry"><i/><i/><i/><i/></div><span className="art-code">INTERACTION / WEBGL / MOTION</span></div>
            <div className="project-meta"><div><h3>Portfolio Lab</h3><p>Creative technology · Web experiments</p></div><span>2026 ↗</span></div>
          </a>
        </div>
      </section>

      <section className="experiments section" id="experiments">
        <div className="section-kicker">03 / EXPERIMENTS</div>
        <h2>AI / 3D / Motion / Web</h2>
        <div className="experiment-list">
          <a href="https://github.com/yesu166?tab=repositories"><span>01</span><strong>Agentic systems</strong><span>Tools, memory, workflows ↗</span></a>
          <a href="https://github.com/yesu166?tab=repositories"><span>02</span><strong>Generative worlds</strong><span>3D, shaders, atmosphere ↗</span></a>
          <a href="https://github.com/yesu166?tab=repositories"><span>03</span><strong>Motion studies</strong><span>Interaction, easing, timing ↗</span></a>
          <a href="https://github.com/yesu166?tab=repositories"><span>04</span><strong>Web experiments</strong><span>Interfaces with a little wonder ↗</span></a>
        </div>
      </section>

      <footer className="footer section" id="contact">
        <div className="footer-glow" aria-hidden="true" />
        <div className="section-kicker">04 / THE NEXT THING</div>
        <h2>Have an idea worth<br/><em>bringing to life?</em></h2>
        <a className="footer-cta" href="https://www.linkedin.com/in/yesuraja01" target="_blank" rel="noreferrer">Let's create <ArrowUpRight size={20}/></a>
        <div className="footer-bottom">
          <a className="wordmark" href="#home">YESU<span>°</span></a>
          <div className="footer-links"><a href="https://github.com/yesu166" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/yesuraja01" target="_blank" rel="noreferrer">LinkedIn</a><a href="#home">Back to top</a></div>
          <span>© 2026 YESU · MADE WITH INTENTION</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
