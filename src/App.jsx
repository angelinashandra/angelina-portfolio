import { useEffect, useMemo, useRef, useState } from 'react'
import { copy, projects, proof, stats, tools, timeline } from './data'

function useSfx(on) {
  const ctx = useRef(null)
  return (freq = 440, duration = 0.06, delay = 0) => {
    if (!on) return
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const audio = ctx.current || new AudioCtx()
    ctx.current = audio
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    osc.type = 'square'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.035, audio.currentTime + delay)
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + delay + duration)
    osc.connect(gain)
    gain.connect(audio.destination)
    osc.start(audio.currentTime + delay)
    osc.stop(audio.currentTime + delay + duration)
  }
}

function RandomProof({ items, title, button, play }) {
  const [visible, setVisible] = useState([0, 1, 2])
  const [rolling, setRolling] = useState(false)
  const roll = () => {
    play(590, 0.07)
    setRolling(true)
    window.setTimeout(() => {
      const next = items.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 3)
      setVisible(next)
      setRolling(false)
    }, 180)
  }
  return (
    <section className="case-stat-roll" aria-label={title}>
      <div className="case-stat-roll-head">
        <span>{title}</span>
        <button type="button" onClick={roll}><i aria-hidden>✦</i>{button}</button>
      </div>
      <div className={`case-stat-slots ${rolling ? 'is-rolling' : ''}`} aria-live="polite">
        {visible.map((idx) => {
          const [tag, value, label] = items[idx]
          return <article className="case-stat-slot" key={`${idx}-${tag}`}><small>{tag}</small><strong>{value}</strong><p>{label}</p></article>
        })}
      </div>
    </section>
  )
}

function DistrictVisual({ index }) {
  if (index === 0) return <div className="district-visual district-brand-preview"><div className="district-brand-lockup" aria-label="MinuteMinder"><span className="mm-brand-mark" aria-hidden><i/><b/><em/></span><span className="mm-brand-word">Minute<span>Minder</span></span></div><p>GOOGLE MEET TIMER · AI AGENDA · SMART NUDGES</p><span>UNLOCKED // FULL UX + GTM CASE</span></div>
  if (index === 1) return <div className="district-visual sfr-district-preview"><div className="sfr-district-lockup" aria-label="Smart Find and Replace"><b aria-hidden>↔</b><div><strong>Smart Find <i>&</i> Replace</strong><small>FOR MIRO</small></div></div><p>FIND · PREVIEW · REPLACE</p><span>UNLOCKED // FULL PRODUCT STRATEGY + GTM CASE</span></div>
  if (index === 2) return <div className="district-visual hpr-district-preview"><div className="hpr-district-grid" aria-hidden><i/><i/><i/><i/></div><div className="hpr-district-lockup" aria-label="Hidden Property Risk AI"><div className="fake-hpr-logo">H</div><div><strong>HIDDEN PROPERTY</strong><b>RISK AI</b><small>SPANISH LISTING PRE-CHECK</small></div></div><div className="hpr-district-result"><span>LISTING SCANNED</span><b>72 / 100</b><strong>INVESTIGATE</strong></div><p>PASTE LINK → FIND HIDDEN RISK</p><span>UNLOCKED // DISCOVERY + UX + GOOGLE ADS CASE</span></div>
  if (index === 3) return <div className="district-visual mes-district-preview"><div className="mes-market-grid" aria-hidden>{Array.from({ length: 9 }).map((_, i) => <i key={i}/>)}</div><div className="mes-market-ticker" aria-hidden><span>BTC +2.8%</span><span>QQQ +0.9%</span><span>XLE +1.6%</span><span>TLT −0.4%</span></div><div className="mes-district-lockup" aria-label="Market Event Signals"><div className="fake-mes-logo">⚡</div><div><strong>MARKET EVENT</strong><b>SIGNALS</b><small>EVENT → MECHANISM → ASSET</small></div></div><div className="mes-district-proof"><span><b>103</b> VISITS</span><span><b>15</b> TRIALS</span><span><b>22.9%</b> BEST WINDOW</span></div><p>LIVE MARKET INTEL // PRESS START</p><span>UNLOCKED // HONEST GTM + LEARNING CASE</span></div>
  return <div className="district-visual orly-district-preview"><div className="orly-district-grid" aria-hidden>{Array.from({ length: 6 }).map((_, i) => <i key={i}/>)}</div><div className="orly-district-lockup" aria-label="Orly Orthopedia"><span aria-hidden>O</span><div><strong>ORLY</strong><b>ORTHOPEDIA</b><small>LEAD SYSTEMS CLINIC · ISRAEL</small></div></div><div className="orly-district-flow"><span>ADS</span><i>→</i><span>EVENT</span><i>→</i><span>CRM</span><i>→</i><span>RESPONSE</span></div><div className="orly-district-proof"><span><b>−61.3%</b> GOOGLE CPL</span><span><b>723</b> META LEADS</span><span><b>1,070</b> CRM LEADS</span></div><p>SEARCH → TRACK → FOLLOW UP</p><span>UNLOCKED // PERFORMANCE + OPERATIONS CASE</span></div>
}

function TitleScreen({ lang, setLang, sfx, setSfx, enter, quick, play }) {
  const S = copy[lang]
  const [power, setPower] = useState(false)
  return (
    <main className="title-screen">
      <div className="scanlines" aria-hidden="true" />
      <header className="game-header">
        <div className="mini-logo"><strong>AS</strong><span>// {S.player}</span></div>
        <div className="target-line" aria-hidden="true"><i /></div>
        <div className="header-controls"><LanguageToggle lang={lang} setLang={setLang}/><button className="sound-button" onClick={() => setSfx(!sfx)} aria-pressed={sfx} aria-label={sfx ? 'Mute sounds' : 'Enable sounds'}><span aria-hidden>{sfx ? '▮)))' : '▮×'}</span><small>SFX {sfx ? 'ON' : 'OFF'}</small></button></div>
      </header>
      <section className="title-grid">
        <div className="title-copy">
          <p className="glitch-kicker">{S.role}</p>
          <h1><span>ANGELINA</span><span>SHANDRA</span></h1>
          <div className="available-badge"><b>♥</b>{S.available}</div>
          <div className="mission-title"><small>{S.mission}</small><strong>{S.hire}</strong></div>
          <div className="recruiter-snapshot" aria-label={S.snapshotLabel}><span>{S.snapshotLabel}</span><div>{S.snapshotItems.map(([a,b]) => <article key={a}><small>{a}</small><b>{b}</b></article>)}</div></div>
          <div className="title-actions"><button className="pixel-button primary" onMouseEnter={() => play(420)} onClick={enter}>{S.start}<span>▶</span></button><button className="pixel-button secondary" onMouseEnter={() => play(360)} onClick={quick}>{S.quick}<span>›</span></button></div>
        </div>
        <div className="profile-wrap">
          <div className="profile-label"><span>╭─</span>{S.select}<span>─╮ ···</span></div>
          <div className={`profile-card profile-character-toggle ${power ? 'is-power-mode' : ''}`} role="button" tabIndex="0" aria-pressed={power} aria-label={power ? S.powerReady : S.powerHint} onMouseEnter={() => play(680, .05)} onClick={() => { setPower(!power); play(power ? 420 : 760, .07) }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPower(!power); play(power ? 420 : 760, .07) } }}>
            <div className="corner tl"/><div className="corner tr"/><div className="corner bl"/><div className="corner br"/>
            <div className="profile-art"><img className="profile-art-idle" src="/assets/angelina-cyber-builder.png" alt="Pixel-art portrait of Angelina Shandra as a cyber product builder"/><img className="profile-art-power" src="/assets/angelina-cyber-builder-power.webp" alt={S.powerAlt}/><div className="power-mode-hint" aria-hidden><span>{S.powerHint}</span><b>{S.powerReady}</b></div></div>
            <div className="profile-stats"><div><small>LVL</small><b>01</b></div><div className="xp-bar">{Array.from({ length: 8 }).map((_, i) => <span key={i}/>)}</div><div><small>EXP</small><b>20%</b></div></div>
          </div>
        </div>
      </section>
    </main>
  )
}

function LanguageToggle({ lang, setLang }) {
  return <div className="language-toggle" aria-label="Language"><button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button><span>|</span><button className={lang === 'ua' ? 'active' : ''} onClick={() => setLang('ua')}>UA</button></div>
}

function PortfolioWorld({ lang, setLang, sfx, setSfx, play, openCase }) {
  const S = copy[lang]
  const C = projects[lang]
  const nav = useMemo(() => [['work', lang === 'en' ? 'PROJECTS' : 'ПРОЄКТИ'], ['stats', lang === 'en' ? 'SKILLS' : 'НАВИЧКИ'], ['experience', lang === 'en' ? 'LOG' : 'ДОСВІД'], ['tools', lang === 'en' ? 'TOOLS' : 'ІНСТРУМЕНТИ'], ['about', lang === 'en' ? 'ABOUT' : 'ПРО МЕНЕ'], ['contact', lang === 'en' ? 'CO-OP' : 'КОНТАКТИ']], [lang])
  const [active, setActive] = useState('work')
  const scrollTo = (id) => { play(520, .05); setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  useEffect(() => {
    const onScroll = () => {
      let next = 'work'
      nav.forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 180) next = id })
      setActive(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [nav])
  return (
    <main className="portfolio-world">
      <div className="scanlines" aria-hidden />
      <header className="world-header"><button className="world-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>AS<span>//01</span></button><nav aria-label="Main navigation"><button onClick={() => scrollTo('work')}>{S.navWork}</button><button onClick={() => scrollTo('about')}>{S.navAbout}</button><button onClick={() => scrollTo('contact')}>{S.navContact}</button></nav><div className="world-actions"><LanguageToggle lang={lang} setLang={setLang}/><button className="world-sound" onClick={() => setSfx(!sfx)} aria-pressed={sfx}>SFX {sfx ? 'ON' : 'OFF'}</button></div></header>
      <section className="map-intro" id="top"><div><p className="section-code">{S.mapEyebrow}</p><h2>{S.mapTitle}</h2><p>{S.mapText}</p></div><div className="map-avatar"><img src="/assets/angelina-cyber-builder.png" alt="Angelina's selected pixel character"/><span>PLAYER READY</span></div></section>
      <section className="mission-map" aria-label="Portfolio level navigation"><div className="map-line" aria-hidden/>{nav.map(([id, label], i) => <button aria-current={active === id ? 'location' : undefined} onClick={() => scrollTo(id)} onMouseEnter={() => play(300 + i * 45)} key={id}><span className={active === id ? 'active' : ''}>{String(i + 1).padStart(2, '0')}</span><b>{label}</b></button>)}</section>
      <section className="content-section" id="work"><div className="section-heading"><p className="section-code">CAREER CITY // CHOOSE A DISTRICT</p><h2>{S.workTitle}</h2><p>{S.workText}</p></div><div className="case-grid">{C.map((p, i) => <ProjectCard key={p.code} project={p} index={i} S={S} play={play} openCase={() => openCase(p.slug)}/>)}</div></section>
      <section className="content-section stats-section" id="stats"><div className="section-heading"><p className="section-code">LEVEL 02 // BUILD</p><h2>{S.statsTitle}</h2><p>{S.statsText}</p></div><div className="stats-console">{stats.map(([label, value]) => <div className="stat-row" key={label}><span>{label}</span><div className="stat-track"><i style={{ width: `${value}%` }}/></div><b>{value}</b></div>)}</div></section>
      <section className="content-section" id="experience"><div className="section-heading"><p className="section-code">LEVEL 03 // SAVE FILE</p><h2>{S.experienceTitle}</h2></div><div className="timeline">{timeline[lang].map(([time, role, org, body]) => <article key={`${time}-${org}`}><time>{time}</time><div className="timeline-dot"/><div><p>{org}</p><h3>{role}</h3><span>{body}</span></div></article>)}</div></section>
      <section className="content-section" id="tools"><div className="section-heading"><p className="section-code">LEVEL 04 // LOADOUT</p><h2>{S.toolsTitle}</h2></div><div className="inventory-grid">{tools.map((tool, i) => <div key={tool}><span>{String(i + 1).padStart(2, '0')}</span><b>{tool}</b></div>)}</div></section>
      <AboutSection S={S}/>
      <section className="contact-section" id="contact"><p className="section-code">FINAL LEVEL // START CO-OP</p><h2>{S.contactTitle}</h2><p>{S.contactBody}</p><div className="contact-actions"><a className="pixel-button primary" href="mailto:ange000123@gmail.com">{S.email}<span>↗</span></a><a className="pixel-button secondary" href="https://www.linkedin.com/in/angelinashandra" target="_blank" rel="noreferrer">{S.linkedin}<span>↗</span></a><a className="pixel-button phone" href="tel:+380993639257" aria-label={`${S.phone}: +380 99 363 92 57`}>{S.phone}<span>+380 99 363 92 57</span></a></div><div className="location-tag">● {S.location}</div></section>
      <footer><span>{S.footer}</span><span>© 2026 // GAME ON</span></footer>
    </main>
  )
}

function ProjectCard({ project, index, S, play, openCase }) {
  return <article className={`case-card district-card ${index === 1 ? 'sfr-district-card' : ''} ${index === 2 ? 'hpr-district-card' : ''} ${index === 3 ? 'mes-district-card' : ''} ${index === 4 ? 'orly-district-card' : ''}`}><div className="case-topline"><span>{project.code}</span><b>{project.status}</b></div><DistrictVisual index={index}/><div className="case-number">0{index + 1}</div><h3>{project.title}</h3><p className="case-subtitle">{project.subtitle}</p><div className="case-meta-line"><span>{project.company}</span><span>{project.period}</span><span>{project.engagement}</span></div><p className="case-objective"><span>{S.objective}</span>{project.objective}</p><RandomProof items={proof[project.code] || []} title={S.caseRoll} button={S.rollAgain} play={play}/><button type="button" className={`district-enter ${index === 1 ? 'sfr-district-enter' : ''} ${index === 2 ? 'hpr-district-enter' : ''} ${index === 3 ? 'mes-district-enter' : ''} ${index === 4 ? 'orly-district-enter' : ''}`} onMouseEnter={() => play(620, .07)} onClick={openCase}>{S.enterDistrict}<span>▶</span></button><details><summary onClick={() => play(470, .05)}>{S.openIntel}<span>+</span></summary><div className="intel-grid"><div><b>{S.owned}</b><p>{project.owned}</p></div><div><b>{S.outcome}</b><p>{project.outcome}</p></div><div><b>{S.nextMove}</b><p>{project.next}</p></div></div></details></article>
}

function AboutSection({ S }) {
  return <section className="content-section about-section" id="about"><div className="about-player-card"><div className="about-image"><img src="/assets/angelina-cyber-builder.png" alt="Angelina's pixel character"/><div className="about-image-hud"><span>PLAYER 01</span><b>PRODUCT MODE // ACTIVE</b></div></div><div className="about-copy"><p className="section-code">LEVEL 05 // PLAYER LORE</p><span className="about-eyebrow">{S.aboutTitle}</span><h2>{S.aboutClaim}</h2><p>{S.aboutBody}</p><p>{S.aboutBodyTwo}</p><blockquote>{S.aboutNote}</blockquote></div></div><div className="player-identity"><div className="player-identity-head"><span>●</span><b>{S.identityTitle}</b><i>PROFILE LOADED</i></div><div className="player-identity-grid">{S.identityItems.map(([a, b]) => <article key={a}><span>{a}</span><b>{b}</b></article>)}</div></div><div className="lore-story-grid"><article className="origin-story"><p className="section-code">ORIGIN FILE // 2019—NOW</p><h3>{S.originTitle}</h3><p>{S.originBody}</p><p>{S.originBodyTwo}</p></article><div className="difference-board"><div className="difference-board-head"><span>BUILD NOTES</span><h3>{S.differenceTitle}</h3></div><div className="difference-grid">{S.differenceItems.map(([n, h, p]) => <article key={n}><span>{n}</span><h4>{h}</h4><p>{p}</p></article>)}</div></div></div><div className="playstyle-console"><div className="playstyle-copy"><p className="section-code">PLAYSTYLE // REPEATABLE LOOP</p><h3>{S.playTitle}</h3><p>{S.playIntro}</p></div><div className="playstyle-steps">{S.playSteps.map(([n, h, p], i) => <article key={n}><span>{n}</span><h4>{h}</h4><p>{p}</p>{i < S.playSteps.length - 1 && <i>▶</i>}</article>)}</div></div><div className="next-quest-card"><div><p className="section-code">MISSION SELECT // OPEN</p><h3>{S.nextQuestTitle}</h3><p>{S.nextQuestBody}</p></div><div className="next-quest-tags">{S.nextQuestTags.map(tag => <span key={tag}>✓ {tag}</span>)}</div></div><aside className="side-quest"><span>★</span><div><b>{S.sideTitle}</b><p>{S.sideBody}</p></div></aside></section>
}

function CasePage({ lang, setLang, sfx, setSfx, play, slug, goHome }) {
  const S = copy[lang]
  const project = projects[lang].find(p => p.slug === slug) || projects[lang][0]
  const idx = projects[lang].findIndex(p => p.slug === slug)
  const points = proof[project.code] || []
  return <main className="portfolio-world standalone-case"><div className="scanlines" aria-hidden/><header className="world-header"><button className="world-logo" onClick={goHome}>AS<span>//BACK</span></button><nav aria-label="Case navigation"><button onClick={goHome}>{lang === 'en' ? 'ALL PROJECTS' : 'ВСІ ПРОЄКТИ'}</button><button onClick={() => document.getElementById('case-proof')?.scrollIntoView({ behavior: 'smooth' })}>{lang === 'en' ? 'PROOF' : 'ДОКАЗИ'}</button><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>{S.navContact}</button></nav><div className="world-actions"><LanguageToggle lang={lang} setLang={setLang}/><button className="world-sound" onClick={() => setSfx(!sfx)}>SFX {sfx ? 'ON' : 'OFF'}</button></div></header><section className="case-hero-rebuild"><div><p className="section-code">{project.code} // {project.status}</p><h1>{project.title}</h1><p>{project.subtitle}</p><div className="case-meta-line"><span>{project.company}</span><span>{project.period}</span><span>{project.engagement}</span></div><button className="pixel-button primary" onClick={() => play(740, .12)}>{lang === 'en' ? 'CASE LOADED' : 'КЕЙС ЗАВАНТАЖЕНО'}<span>✓</span></button></div><div className="case-hero-visual"><DistrictVisual index={idx < 0 ? 0 : idx}/></div></section><section className="content-section case-intel-rebuild"><div className="section-heading"><p className="section-code">MISSION BRIEF</p><h2>{lang === 'en' ? 'What happened here' : 'Що відбулося в кейсі'}</h2></div><div className="intel-grid"><div><b>{S.objective}</b><p>{project.objective}</p></div><div><b>{S.owned}</b><p>{project.owned}</p></div><div><b>{S.outcome}</b><p>{project.outcome}</p></div><div><b>{S.nextMove}</b><p>{project.next}</p></div></div></section><section className="content-section" id="case-proof"><div className="section-heading"><p className="section-code">PROOF DROPS</p><h2>{lang === 'en' ? 'Evidence snapshot' : 'Короткі докази'}</h2></div><div className="proof-grid-rebuild">{points.map(([tag, value, label]) => <article key={tag}><small>{tag}</small><strong>{value}</strong><p>{label}</p></article>)}</div></section><section className="contact-section" id="contact"><p className="section-code">FINAL LEVEL // START CO-OP</p><h2>{S.contactTitle}</h2><p>{S.contactBody}</p><div className="contact-actions"><a className="pixel-button primary" href="mailto:ange000123@gmail.com">{S.email}<span>↗</span></a><a className="pixel-button secondary" href="https://www.linkedin.com/in/angelinashandra" target="_blank" rel="noreferrer">{S.linkedin}<span>↗</span></a></div></section></main>
}

export default function App() {
  const [lang, setLang] = useState(() => new URLSearchParams(location.search).get('lang') === 'ua' ? 'ua' : 'en')
  const [entered, setEntered] = useState(() => location.hash && location.hash !== '#home')
  const [slug, setSlug] = useState(() => location.hash?.replace('#', '') || '')
  const [sfx, setSfx] = useState(() => localStorage.getItem('angelina-sfx') === 'on')
  const play = useSfx(sfx)
  useEffect(() => { localStorage.setItem('angelina-sfx', sfx ? 'on' : 'off') }, [sfx])
  useEffect(() => { const onHash = () => { const next = location.hash.replace('#', ''); setSlug(next); setEntered(Boolean(next && next !== 'home')) }; window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  const enter = () => { play(330, .08); play(494, .08, .09); play(740, .14, .18); setEntered(true); window.setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 60) }
  const quick = () => { setEntered(true); window.setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 60) }
  const openCase = (nextSlug) => { play(720, .12); setEntered(true); setSlug(nextSlug); location.hash = nextSlug; window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goHome = () => { setSlug(''); location.hash = 'home'; setEntered(true); setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 50) }
  if (slug && projects[lang].some(p => p.slug === slug)) return <CasePage lang={lang} setLang={setLang} sfx={sfx} setSfx={setSfx} play={play} slug={slug} goHome={goHome}/>
  return entered ? <PortfolioWorld lang={lang} setLang={setLang} sfx={sfx} setSfx={setSfx} play={play} openCase={openCase}/> : <TitleScreen lang={lang} setLang={setLang} sfx={sfx} setSfx={setSfx} enter={enter} quick={quick} play={play}/>
}
