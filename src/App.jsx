import { useState, useEffect, useRef } from "react";
import "./styles.css";

/* ===== SETTINGS: edit these ===== */
const VIDEO_SRC = "/avatar.mp4";   // <- your mp4 file name
const PHOTO = "";   // optional: a photo for the ID card, e.g. "/me.jpg" (put the file in the public folder)
const LINKS = {
  resume: "/Aayushi_Shah_Resume.pdf",                  // put your PDF in the public folder with this name
  github: "https://github.com/your-username",          // <- replace
  linkedin: "https://www.linkedin.com/in/your-handle", // <- replace
};
const NAV = [
  ["About", "#about"], ["Skills", "#skills"], ["Experience", "#experience"],
  ["Projects", "#projects"], ["Achievements", "#achievements"], ["Contact", "#contact"],
];

/* ===== Speech bubble: types out whatever message it receives ===== */
function Bubble({ msg }) {
  const [shown, setShown] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!msg) return;
    setVisible(true); setShown("");
    let i = 0, hide;
    const t = setInterval(() => {
      i++; setShown(msg.text.slice(0, i));
      if (i >= msg.text.length) { clearInterval(t); hide = setTimeout(() => setVisible(false), msg.hold); }
    }, 35);
    return () => { clearInterval(t); clearTimeout(hide); };
  }, [msg]);
  return (
    <div className={"bubble" + (visible ? " show" : "")} aria-live="polite">
      <span>{shown}</span><span className="caret" />
    </div>
  );
}

/* ===== Header with nav + mobile menu ===== */
function Header({ menuOpen, setMenuOpen }) {
  return (
    <header>
      <a href="#home" className="brand">Aayushi Shah</a>
      <nav aria-label="Main">
        {NAV.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </nav>
      <button
        className="circle-btn" id="menuBtn"
        aria-label="Toggle menu" aria-expanded={menuOpen}
        style={menuOpen ? { position: "fixed", top: 28, right: 20, zIndex: 30 } : undefined}
        onClick={() => setMenuOpen(!menuOpen)}
      >{menuOpen ? "✕" : "☰"}</button>
    </header>
  );
}

/* ===== Hero ===== */
function Hero({ say, msg }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // play once on every load or refresh. React doesn't reliably set the "muted" attribute,
  // which makes browsers block autoplay, so we mute the video ourselves before calling play()
  useEffect(() => {
    const v = videoRef.current;
    v.defaultMuted = true;
    v.muted = true;
    const attempt = v.play();
    if (attempt) attempt.catch(() => setPaused(true));   // if the browser still blocks it, show the play button
  }, []);

  // the video is also painted onto a canvas that sits on top of it, which covers
  // the browser's own play button if a browser ever blocks autoplay
  useEffect(() => {
    const v = videoRef.current, c = canvasRef.current, ctx = c.getContext("2d");
    const draw = () => {
      if (!v.videoWidth) return;
      if (c.width !== v.videoWidth) { c.width = v.videoWidth; c.height = v.videoHeight; }
      ctx.drawImage(v, 0, 0);
    };
    let raf;
    const loop = () => { if (!v.paused && !v.ended) draw(); raf = requestAnimationFrame(loop); };
    loop();
    const events = ["loadeddata", "seeked", "pause", "ended"];
    events.forEach((ev) => v.addEventListener(ev, draw));
    draw();
    return () => { cancelAnimationFrame(raf); events.forEach((ev) => v.removeEventListener(ev, draw)); };
  }, []);

  // the big name drifts opposite to the cursor
  useEffect(() => {
    const move = (e) => setOffset({
      x: (e.clientX / innerWidth - 0.5) * -30,
      y: (e.clientY / innerHeight - 0.5) * -16,
    });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (v.paused) { v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
  };
  const toggleSound = () => {
    const v = videoRef.current;
    v.muted = !v.muted; setMuted(v.muted);
    if (!v.muted) v.play();
  };

  return (
    <section className="hero" id="home">
      <div className="ghost" aria-hidden="true" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>AAYUSHI</div>

      <div className="controls">
        <button className="circle-btn" onClick={togglePlay} aria-label={paused ? "Play video" : "Pause video"}>{paused ? "▶" : "❚❚"}</button>
        <button className="circle-btn" onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"}>{muted ? "🔇" : "🔊"}</button>
      </div>

      <div className={"stage" + (videoError ? " no-video" : "")}>
        <video ref={videoRef} src={VIDEO_SRC} autoPlay muted playsInline preload="auto" controls={false} disablePictureInPicture onPlay={() => setPaused(false)} onPause={() => setPaused(true)} onEnded={() => setPaused(true)} onError={() => setVideoError(true)} />
        <canvas ref={canvasRef} className="frame" aria-hidden="true" />
        <div className="fallback">Add your video as <b>&nbsp;{VIDEO_SRC}&nbsp;</b> next to this file</div>
      </div>

      <Bubble msg={msg} />

      <div className="intro">
        <p className="who">Aayushi Shah</p>
        <h1><span>Software</span><span>Engineer.</span></h1>
        <p className="script">Aspiring Product Manager</p>
      </div>

      <div className="cta">
        <a href="#about" className="pill primary">Explore my work</a>
        <a href="#contact" className="pill">Let's talk</a>
      </div>
    </section>
  );
}

/* ===== About ===== */
const ABOUT_CHECKS = [
  ["Software Engineer", "Manulife"],
  ["Computer Science grad", "Honours BSc, May 2026"],
  ["Insurance & banking", "Manulife · Citi"],
  ["Grace Hopper speaker", "2026"],
  ["Women-in-tech member", "Rewriting the Code · AnitaB.org"],
];
const FACTS = [
  ["Based in", "Toronto, Ontario"],
  ["Education", "Honours BSc Computer Science (May 2026)"],
  ["Corporate experience", "Citi, Manulife, WCB, University of Alberta"],
  ["Focus", "Software Engineering × Product Management"],
];

/* Flipping ID card: shows the front first, tap (or press Enter) to flip */
function IdCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="lanyard">
      <span className="strap" aria-hidden="true">AAYUSHI SHAH · AAYUSHI SHAH · AAYUSHI SHAH</span>
      <span className="clip" aria-hidden="true" />
      <div className="persp">
        <button
          type="button"
          className={"idcard" + (flipped ? " flipped" : "")}
          aria-pressed={flipped}
          aria-label="ID card. Tap to flip it over."
          onClick={() => setFlipped(!flipped)}
        >
          <span className="face front">
            <span className="slot" />
            <span className="avatar">{PHOTO ? <img src={PHOTO} alt="" /> : "AS"}</span>
            <span className="id-name">Aayushi Shah</span>
            <span className="id-role">Software Engineer</span>
            <span className="id-script">Aspiring Product Manager</span>
            <span className="barcode" />
            <span className="hint">Tap to flip ↻</span>
          </span>
          <span className="face back">
            <span className="slot" />
            <span className="back-title">What I am</span>
            <span className="checks">
              {ABOUT_CHECKS.map(([title, sub]) => (
                <span className="check" key={title}>
                  <i>✓</i>
                  <span><b>{title}</b><small>{sub}</small></span>
                </span>
              ))}
            </span>
            <span className="sign">Aayushi</span>
          </span>
        </button>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div className="about-text">
          <span className="eyebrow">About</span>
          <h2>Hi, I'm <em>Aayushi.</em></h2>
          <p className="lead">A software engineer at Manulife exploring my next chapter in product management. With experience across insurance and banking, I bring technical depth, thoughtful design, and a customer-first mindset to the products I help build.</p>
          <p className="sub">I'm also a 2026 Grace Hopper speaker and an active member of women-in-tech communities, including Rewriting the Code and AnitaB.org.</p>
          <div className="about-btns">
            <a className="pill primary" href={LINKS.resume} download>Résumé ↓</a>
            <a className="pill" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="pill" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <IdCard />

        <dl className="facts">
          <dt className="facts-title">Quick facts</dt>
          {FACTS.map(([label, value]) => (
            <div className="fact-row" key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ===== Skills: a product-roadmap board ===== */
const SKILL_CARDS = {
  lang: { title: "Languages", color: "#23244F", tilt: -1.2,
    skills: ["Python", "Java", "JavaScript", "SQL", "C/C++", "HTML", "R", "SAS", "MATLAB"] },
  tools: { title: "Frameworks & Tools", color: "#2F7F86", tilt: 0.9,
    skills: ["React", "Node.js", "GitHub", "BitBucket", "Jira", "Android Studio", "Visual Studio", "Apache Airflow"] },
  cloud: { title: "Cloud & Databases", color: "#7B5EA7", tilt: -0.7,
    skills: ["Azure", "AWS", "Docker", "OpenShift", "MongoDB", "Firestore", "Redis", "SQL"] },
  strategy: { title: "Product Strategy", color: "#D9674F", tilt: 1.1,
    skills: ["Problem Identification", "Roadmapping", "Feature Prioritization", "Success Metrics Definition", "Stakeholder Alignment", "Cross-Functional Program Management"] },
  data: { title: "Data & Experimentation", color: "#D69A3B", tilt: -1, 
    skills: ["A/B Testing", "Google Analytics", "Power BI", "Tableau", "Data Analysis"] },
  design: { title: "Design & Prototyping", color: "#2F7F86", tilt: 0.8,
    skills: ["Figma", "Adobe XD", "Wireframing", "User Flows", "High-Fidelity Prototyping", "Product Mockups"] },
  craft: { title: "Engineering Craft", color: "#23244F", tilt: -0.9,
    skills: ["Object-Oriented Design", "Full-Stack Development", "End-to-End System Design", "System & API Design", "Algorithm Implementation", "Data Structures", "Scalability & Optimization", "Agile Development"] },
  soft: { title: "Soft Skills", color: "#D9674F", tilt: 1.2,
    skills: ["Cross-Functional Leadership", "Stakeholder Communication", "Mentorship", "Agile Collaboration"] },
};
const BOARD_COLS = [
  { key: "now", title: "Now", sub: "What I build with every day" },
  { key: "next", title: "Next", sub: "Where I'm headed: product" },
  { key: "always", title: "Always", sub: "How I work" },
];
const START_BOARD = { now: ["lang", "tools", "cloud"], next: ["strategy", "data", "design"], always: ["craft", "soft"] };

function SkillCard({ id }) {
  const card = SKILL_CARDS[id];
  return (
    <article className="scard" style={{ "--pin": card.color }}>
      <div className="scard-head">
        <span className="pin" aria-hidden="true" />
        <h3>{card.title}</h3>
        <span className="count">{card.skills.length}</span>
      </div>
      <ul className="items">{card.skills.map((s) => <li key={s}>{s}</li>)}</ul>
    </article>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills-wrap">
        <span className="eyebrow">Skills</span>
        <div className="skills-top">
          <h2>My skills, <em>roadmapped.</em></h2>
        </div>

        <div className="board">
          {BOARD_COLS.map((col) => (
            <div className="col" data-col={col.key} key={col.key}>
              <div className="col-head"><span className="node" aria-hidden="true" /><h3>{col.title}</h3><p>{col.sub}</p></div>
              <div className="col-body">
                {START_BOARD[col.key].map((id) => <SkillCard key={id} id={id} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Experience: a book you can page through ===== */
// Newest chapter last, so the book reads like a story. Reorder the array to change the order.
// Drop each photo in the "public/photos" folder using the file names below.
const ROLES = [
  {
    id: "ualberta", org: "University of Alberta", sub: "Alberta Innovates Studentship",
    title: "Undergraduate Summer Student Researcher", type: "Research",
    dates: "May 2023 – Aug 2023", place: "Edmonton, AB", year: "2023",
    photo: "/photos/ualberta.jpg", caption: "University of Alberta, summer 2023",
    bullets: [
      "Analyzed data and created predictive models for a lab that studied arsenic transport into red blood cells, using MATLAB and R.",
      "Performed minor web development using HTML and JavaScript, along with fixing bugs for the website.",
    ],
    stats: [], tags: ["MATLAB", "R", "HTML", "JavaScript"],
  },
  {
    id: "wcb", org: "Workers' Compensation Board (WCB)", sub: "",
    title: "Business Systems Analyst Intern", type: "Internship",
    dates: "May 2024 – Aug 2024", place: "Edmonton, AB", year: "2024",
    photo: "/photos/wcb.jpg", caption: "WCB, summer 2024",
    bullets: [
      "Modernized reporting infrastructure for WCB's Policy Account Management portal by migrating 25% of legacy SAS reports to SQL and redesigning data workflows with Business Analysts, accelerating query performance and improving reporting-data access for downstream teams.",
    ],
    stats: [{ n: "25%", l: "of legacy SAS reports migrated to SQL" }], tags: [],
  },
  {
    id: "citi", org: "Citi", sub: "",
    title: "Software Engineer Intern (Product & Platform Engineering)", type: "Internship",
    dates: "May 2025 – Aug 2025", place: "Mississauga, ON", year: "2025",
    photo: "/photos/citi.jpg", caption: "Citi, summer 2025",
    bullets: [
      "Flagged a scalability constraint in Citi's internal Developer Portal and led a cross-functional proof of concept for horizontal scaling; 3X concurrent API capacity, eliminated a single point of failure, and enabled future team onboarding without requiring a full platform rebuild.",
      "Uncovered and closed the authentication-coverage gap across private API endpoints supporting services used by 200M+ customers; partnered with security and engineering to design JWT authentication and role-based access control, increasing protected-endpoint coverage from 98% to 100%.",
    ],
    stats: [
      { n: "3X", l: "concurrent API capacity" },
      { n: "100%", l: "protected-endpoint coverage" },
      { n: "200M+", l: "customers on the services these APIs support" },
    ],
    tags: [],
  },
  {
    id: "manulife", org: "Manulife", sub: "",
    title: "Associate Full-Stack Engineer, AI Platform Enablement", type: "Full-time",
    dates: "July 2026 – Present", place: "Toronto, ON", year: "2026",
    photo: "/photos/manulife.jpg", caption: "Manulife, 2026",
    bullets: [
      "Identified fragmented file-transfer environments and unused transfers as drivers of technical debt and onboarding delays; led the Secure File Gateway Canada migration across 7+ teams, reducing remediation effort by 68% (22 to 7 hours) and onboarding time by 81% (3 hours to 35 minutes), with zero production incidents.",
      "Analyzed documentation-related support tickets and stakeholder workflows to identify authoring and discoverability gaps; redesigned the Confluence information architecture and launched a Rovo-powered AI authoring workflow, improving documentation efficiency by 92% and reducing missing-documentation tickets by 30%+.",
    ],
    stats: [
      { n: "68%", l: "less remediation effort" },
      { n: "81%", l: "faster onboarding" },
      { n: "92%", l: "documentation efficiency" },
    ],
    tags: [],
  },
];

// Every page of the book, in order. Even positions are right-hand pages, odd positions are left-hand pages.
const FACES = [
  { t: "cover" }, { t: "inside" }, { t: "contents" },
  ...ROLES.flatMap((r) => [{ t: "photo", r }, { t: "text", r }]),
  { t: "next" }, { t: "back" },
];
const LEAVES = (FACES.length - 1) / 2;   // pages that can be turned

function useMedia(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on); on();
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

function Polaroid({ role }) {
  const [missing, setMissing] = useState(!role.photo);
  return (
    <div className="polaroid">
      <div className="shot">
        {missing
          ? <span className="shot-empty">{role.org}<small>photo coming soon</small></span>
          : <img src={role.photo} alt={role.caption} onError={() => setMissing(true)} />}
      </div>
      <span className="cap">{role.caption}</span>
    </div>
  );
}

function Face({ face, idx, jump, touch }) {
  const r = face.r;
  switch (face.t) {
    case "cover":
      return (
        <div className="page cover-page">
          <span className="cover-top">AAYUSHI SHAH</span>
          <h3>Experience</h3>
          <span className="cover-script">my story so far</span>
          <span className="cover-hint">{touch ? "Tap to open" : "Click to open"} →</span>
        </div>
      );
    case "inside":
      return (
        <div className="page center-page">
          <span className="small-caps">2023 → now</span>
          <p className="big-script">From research to platform engineering.</p>
        </div>
      );
    case "contents":
      return (
        <div className="page">
          <h3 className="pg-title">Contents</h3>
          <ol className="toc">
            {ROLES.map((role, i) => (
              <li key={role.id}>
                <button type="button" onClick={() => jump(i)}>
                  <span className="toc-n">0{i + 1}</span>
                  <span className="toc-t"><b>{role.org}</b><small>{role.title}</small></span>
                  <span className="toc-y">{role.year}</span>
                </button>
              </li>
            ))}
            <li className="toc-next"><span className="toc-n">→</span><span className="toc-t"><b>Next chapter</b><small>Product Management</small></span></li>
          </ol>
          <span className="folio">{idx - 1}</span>
        </div>
      );
    case "photo":
      return (
        <div className="page">
          <Polaroid role={r} />
          {r.stats.length > 0 && (
            <div className="stats" style={{ "--n": r.stats.length }}>
              {r.stats.map((s) => <div className="stat" key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
            </div>
          )}
          {r.tags.length > 0 && <div className="tags">{r.tags.map((t) => <span key={t}>{t}</span>)}</div>}
          <span className="folio">{idx - 1}</span>
        </div>
      );
    case "text":
      return (
        <div className="page">
          <span className="badge">{r.type}</span>
          <h3 className="role-org">{r.org}</h3>
          {r.sub && <span className="role-sub">{r.sub}</span>}
          <p className="role-title">{r.title}</p>
          <p className="role-meta">{r.dates} · {r.place}</p>
          <ul className="role-list">{r.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
          <span className="folio">{idx - 1}</span>
        </div>
      );
    case "next":
      return (
        <div className="page center-page">
          <span className="small-caps">Next chapter</span>
          <p className="big-script">Product Management</p>
          <p className="muted">to be continued…</p>
          <a className="pill primary" href="#contact">Let's talk</a>
        </div>
      );
    default:
      return (
        <div className="page cover-page">
          <h3 className="thanks">Thanks for reading</h3>
          <span className="cover-script">Aayushi Shah</span>
        </div>
      );
  }
}

/* Desktop: a two-page book with real page turns */
function BookDesktop() {
  const [f, setF] = useState(0);        // how many pages have been turned
  const [anim, setAnim] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const goTo = (n) => {
    n = Math.max(0, Math.min(LEAVES, n));
    if (n === f) return;
    setAnim({ from: f, to: n });
    setF(n);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAnim(null), 1200 + Math.abs(n - f) * 110);
  };
  const delayFor = (j) => {
    if (!anim) return 0;
    if (anim.to > anim.from && j >= anim.from && j < anim.to) return (j - anim.from) * 110;
    if (anim.to < anim.from && j >= anim.to && j < anim.from) return (anim.from - 1 - j) * 110;
    return 0;
  };
  const turning = (j) => anim && j >= Math.min(anim.from, anim.to) && j < Math.max(anim.from, anim.to);
  const onKey = (e) => {
    if (e.key === "ArrowRight") goTo(f + 1);
    if (e.key === "ArrowLeft") goTo(f - 1);
  };
  const label = f === 0 ? "Cover" : f === 1 ? "Contents" : f === LEAVES ? "To be continued" : `Chapter ${f - 1} of ${ROLES.length}`;

  return (
    <>
      <div className="book-stage" tabIndex={0} onKeyDown={onKey} aria-label="Experience book. Use the left and right arrow keys to turn pages.">
        <div className={"book" + (f === 0 ? " closed" : "")}>
          <div className="book-shadow" />
          <div className="static-right"><Face face={FACES[FACES.length - 1]} idx={FACES.length - 1} jump={() => {}} /></div>
          {Array.from({ length: LEAVES }, (_, j) => (
            <div
              key={j}
              className={"leaf" + (j < f ? " flipped" : "")}
              style={{ zIndex: turning(j) ? 30 : j < f ? j + 1 : LEAVES - j, transitionDelay: delayFor(j) + "ms" }}
            >
              <div className="side front"
                onClick={j === 0 ? () => goTo(1) : undefined}
                style={j === 0 ? { cursor: "pointer" } : undefined}>
                <Face face={FACES[2 * j]} idx={2 * j} jump={(i) => goTo(i + 2)} />
                {j > 0 && <button type="button" className="corner r" aria-label="Next page" onClick={() => goTo(j + 1)} />}
              </div>
              <div className="side back">
                <Face face={FACES[2 * j + 1]} idx={2 * j + 1} jump={(i) => goTo(i + 2)} />
                <button type="button" className="corner l" aria-label="Previous page" onClick={() => goTo(j)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="book-controls">
        <button type="button" className="circle-btn" onClick={() => goTo(f - 1)} disabled={f === 0} aria-label="Previous page">←</button>
        <span>{label}</span>
        <button type="button" className="circle-btn" onClick={() => goTo(f + 1)} disabled={f === LEAVES} aria-label="Next page">→</button>
      </div>
    </>
  );
}

/* Phones: one page at a time */
function BookMobile() {
  const [p, setP] = useState(0);
  const start = useRef(null);
  const next = () => setP((x) => Math.min(FACES.length - 1, x + 1));
  const prev = () => setP((x) => Math.max(0, x - 1));
  const onEnd = (e) => {
    if (start.current === null) return;
    const dx = e.changedTouches[0].clientX - start.current;
    start.current = null;
    if (dx < -50) next(); else if (dx > 50) prev();
  };
  return (
    <div className="m-book">
      <div
        className="m-page" key={p}
        onTouchStart={(e) => { start.current = e.touches[0].clientX; }}
        onTouchEnd={onEnd}
        onClick={p === 0 ? next : undefined}
      >
        <Face face={FACES[p]} idx={p} jump={(i) => setP(3 + 2 * i)} touch />
      </div>
      <div className="book-controls">
        <button type="button" className="circle-btn" onClick={prev} disabled={p === 0} aria-label="Previous page">←</button>
        <span>{p + 1} / {FACES.length}</span>
        <button type="button" className="circle-btn" onClick={next} disabled={p === FACES.length - 1} aria-label="Next page">→</button>
      </div>
    </div>
  );
}

function Experience() {
  const mobile = useMedia("(max-width: 860px)");
  return (
    <section className="experience" id="experience">
      <div className="exp-wrap">
        <span className="eyebrow">Experience</span>
        <h2>My book of <em>experiences.</em></h2>
        <p className="exp-hint">{mobile ? "Tap the arrows or swipe to turn the page." : "Click the corner of a page to turn it."}</p>
        {mobile ? <BookMobile /> : <BookDesktop />}
      </div>
    </section>
  );
}

/* ===== App ===== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const say = (text, hold = 4500) => setMsg({ text, hold });

  useEffect(() => { document.body.classList.toggle("menu-open", menuOpen); }, [menuOpen]);
  useEffect(() => {
    const t = setTimeout(() => say("Hi, I'm Aayushi! Welcome to my corner of the internet. 👋"), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero say={say} msg={msg} />
      <About />
      <Skills />
      <Experience />
      <footer>© Aayushi Shah</footer>
    </>
  );
}
