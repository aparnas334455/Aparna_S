import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Mail, Phone, Link2, MapPin, Download, ArrowUpRight, FlaskConical,
  GraduationCap, X, ChevronLeft, ChevronRight, Award, Microscope, Dna, Menu,
} from 'lucide-react'
import {
  profile, stats, education, skills, projects, internships, interests,
  languages, certificates,
} from './data'

const CURRENT_YEAR = new Date().getFullYear()

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Research'],
  ['experience', 'Experience'],
  ['certificates', 'Certificates'],
  ['contact', 'Contact'],
]

let supportsDisplayTransition

function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false
  }
  const probe = document.createElement('div')
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;'
  document.body.appendChild(probe)
  void getComputedStyle(probe).display
  probe.style.display = 'none'
  supportsDisplayTransition = getComputedStyle(probe).display === 'block'
  probe.remove()
  return supportsDisplayTransition
}

function supportsTopLayerExit() {
  return Boolean(window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay())
}

function StatCard({ stat, index }) {
  const numericTarget = Number.parseFloat(stat.value)
  const decimals = stat.value.includes('.') ? stat.value.split('.')[1].length : 0
  const [display, setDisplay] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      return stat.value
    }
    return Number.isNaN(numericTarget) ? stat.value : (0).toFixed(decimals)
  })

  useEffect(() => {
    if (
      Number.isNaN(numericTarget) ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      return
    }

    let rafId = 0
    const delayMs = 240 + index * 110
    const durationMs = 1050
    let startTime = null

    const timerId = window.setTimeout(() => {
      const tick = (now) => {
        if (startTime === null) startTime = now
        const progress = Math.min(1, (now - startTime) / durationMs)
        const eased = 1 - (1 - progress) ** 3
        const current = numericTarget * eased
        setDisplay(progress >= 1 ? stat.value : current.toFixed(decimals))
        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick)
        }
      }
      rafId = window.requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      window.clearTimeout(timerId)
      window.cancelAnimationFrame(rafId)
    }
  }, [decimals, index, numericTarget, stat.value])

  const icons = [GraduationCap, Microscope, FlaskConical, Award]
  const Icon = icons[index % icons.length]
  const fills = ['90%', '78%', '68%', '88%']

  return (
    <div
      className="stat-card"
      style={{ '--delay': `${240 + index * 70}ms`, '--fill': fills[index % fills.length] }}
    >
      <div className="stat-top">
        <span className="stat-icon" aria-hidden="true">
          <Icon size={17} />
        </span>
        <span className="stat-pip" aria-hidden="true" />
      </div>
      <b className="stat-value">
        <span className="sr-only">{stat.value}</span>
        <span aria-hidden="true">{display}</span>
      </b>
      <span className="stat-label">{stat.label}</span>
      <span className="stat-bar" aria-hidden="true" />
    </div>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div data-reveal="">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index]
  const dialogRef = useRef(null)
  const closingRef = useRef(false)

  const handleAnimatedClose = useCallback(async () => {
    const dialog = dialogRef.current
    if (!dialog || closingRef.current) return
    closingRef.current = true

    if (supportsTopLayerExit()) {
      dialog.close()
      const animations = dialog.getAnimations({ subtree: true })
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => setTimeout(r, 400)),
        ])
      }
    } else {
      dialog.setAttribute('data-closing', '')
      const animations = dialog.getAnimations({ subtree: true })
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => setTimeout(r, 400)),
        ])
      }
      dialog.removeAttribute('data-closing')
      if (dialog.open) dialog.close()
    }

    onClose()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!dialog.open) {
      dialog.showModal()
    }

    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }

    const onCancel = (e) => {
      e.preventDefault()
      handleAnimatedClose()
    }

    let cleanupOutside = null
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const outside = (e) => {
        const r = dialog.getBoundingClientRect()
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom
      }
      let pressedOutside = false
      const onPointerDown = (e) => {
        pressedOutside = outside(e)
      }
      const onPointerUp = (e) => {
        if (pressedOutside && outside(e)) {
          handleAnimatedClose()
        }
      }
      dialog.addEventListener('pointerdown', onPointerDown)
      dialog.addEventListener('pointerup', onPointerUp)
      cleanupOutside = () => {
        dialog.removeEventListener('pointerdown', onPointerDown)
        dialog.removeEventListener('pointerup', onPointerUp)
      }
    }

    window.addEventListener('keydown', onKey)
    dialog.addEventListener('cancel', onCancel)

    return () => {
      window.removeEventListener('keydown', onKey)
      dialog.removeEventListener('cancel', onCancel)
      cleanupOutside?.()
    }
  }, [handleAnimatedClose, onNav])

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      closedby="any"
      aria-labelledby="lb-title"
      onClose={() => {
        if (!closingRef.current) onClose()
      }}
    >
      <button
        type="button"
        className="lb-btn lb-close"
        onClick={handleAnimatedClose}
        aria-label="Close certificate preview"
        autoFocus
      >
        <X size={22} />
      </button>
      <div className="lightbox-frame">
        <button
          type="button"
          className="lb-btn lb-prev"
          onClick={() => onNav(-1)}
          aria-label="Previous certificate"
        >
          <ChevronLeft size={26} />
        </button>
        <figure>
          <img key={item.id} src={item.img} alt={`${item.title} — ${item.issuer}`} />
          <figcaption>
            <strong id="lb-title">{item.title}</strong>
            <span>{item.issuer} · {item.date}</span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="lb-btn lb-next"
          onClick={() => onNav(1)}
          aria-label="Next certificate"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </dialog>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [lb, setLb] = useState(null)

  const categories = ['All', ...new Set(certificates.map((c) => c.category))]
  const shown = filter === 'All' ? certificates : certificates.filter((c) => c.category === filter)

  const openCert = (id) => {
    setFilter('All')
    setLb(certificates.findIndex((c) => c.id === id))
  }
  const navLb = useCallback(
    (d) => setLb((i) => (i === null ? null : (i + d + certificates.length) % certificates.length)),
    [],
  )

  useEffect(() => {
    if (
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)') ||
      !window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    ) {
      return
    }

    const targets = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    )

    for (const el of targets) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-visible')
      } else {
        el.classList.add('reveal-pending')
        observer.observe(el)
      }
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="brand">
            <Dna size={20} aria-hidden="true" /> Aparna S
          </a>
          <div className="nav-right">
            <nav className={open ? 'open' : ''} aria-label="Primary navigation">
              {NAV.map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="pill hero-anim" style={{ '--delay': '0ms' }}>
                <span className="pill-dot" aria-hidden="true" />
                <FlaskConical size={15} aria-hidden="true" /> Open to opportunities in life sciences
              </p>
              <h1 className="hero-anim" style={{ '--delay': '70ms' }}>
                Hi, I&apos;m <span>{profile.name}</span>.<br />{profile.title}.
              </h1>
              <p className="lead hero-anim" style={{ '--delay': '140ms' }}>{profile.tagline}</p>
              <div className="cta hero-anim" style={{ '--delay': '210ms' }}>
                <a className="btn primary" href={profile.cv} download="Aparna_S_CV.pdf">
                  <Download size={18} aria-hidden="true" /> Download CV
                </a>
                <a className="btn" href="#contact">
                  Get in touch <ArrowUpRight size={18} className="arrow-icon" aria-hidden="true" />
                </a>
              </div>
              <p className="loc hero-anim" style={{ '--delay': '270ms' }}>
                <MapPin size={16} aria-hidden="true" /> {profile.location}, India
              </p>
            </div>
            <div className="hero-photo hero-anim" style={{ '--delay': '130ms' }}>
              <div className="ring-soft" aria-hidden="true" />
              <svg className="micro-reticle" viewBox="0 0 360 360" fill="none" aria-hidden="true">
                <g className="reticle-outer">
                  <circle
                    cx="180"
                    cy="180"
                    r="168"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeDasharray="6 9"
                  />
                  <circle cx="180" cy="12" r="4.5" fill="currentColor" />
                  <circle cx="180" cy="348" r="3.5" fill="currentColor" opacity="0.6" />
                </g>
                <g className="reticle-inner">
                  <circle
                    cx="180"
                    cy="180"
                    r="146"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 10"
                    opacity="0.7"
                  />
                  <circle cx="34" cy="180" r="3.5" fill="currentColor" opacity="0.85" />
                </g>
              </svg>
              <div className="bio-mote mote-1" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="8" width="12" height="8" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M6 12C4 12 3 10.5 2 11.5M18 12C20 12 21 13.5 22 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="bio-mote mote-2" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="9.5" cy="9.5" r="3.2" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="15.2" cy="10.8" r="2.6" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="11.8" cy="15.4" r="2.8" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </div>
              <div className="bio-mote mote-3" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" strokeDasharray="16 5" />
                  <circle cx="12" cy="12" r="2.4" fill="currentColor" />
                </svg>
              </div>
              <div className="ring" aria-hidden="true" />
              <div className="photo-frame">
                <img src={profile.photo} alt="Portrait of Aparna S" />
              </div>
            </div>
          </div>
          <div className="container stats">
            {stats.map((s, idx) => (
              <StatCard key={s.label} stat={s} index={idx} />
            ))}
          </div>
        </section>

        <Section id="about" eyebrow="About" title="Training in the lab, curiosity at the bench">
          <div className="about-grid">
            <p className="about-text" data-reveal="">{profile.about}</p>
            <div className="card" data-reveal="">
              <h3><GraduationCap size={18} aria-hidden="true" /> Education</h3>
              {education.map((e) => (
                <div className="edu" key={e.degree}>
                  <strong>{e.degree}</strong>
                  <span>{e.place}</span>
                  <em>{e.years} · {e.score}</em>
                </div>
              ))}
            </div>
          </div>
          <h3 className="sub" data-reveal="">Areas of interest</h3>
          <div className="chips" data-reveal="">
            {interests.map((i) => <span key={i}>{i}</span>)}
          </div>
          <p className="langs" data-reveal=""><b>Languages:</b> {languages.join(' · ')}</p>
        </Section>

        <Section id="skills" eyebrow="Skills" title="Technical toolkit">
          <div className="skill-grid">
            {Object.entries(skills).map(([group, list], idx) => (
              <div className="card" key={group} data-reveal="" style={{ '--reveal-delay': `${idx * 70}ms` }}>
                <h3>{group}</h3>
                <ul className="tags">{list.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Research" title="Projects">
          <div className="proj-grid">
            {projects.map((p, idx) => (
              <article
                className="card proj"
                key={p.title}
                data-reveal=""
                style={{ '--reveal-delay': `${idx * 90}ms` }}
              >
                <span className="badge">{p.level}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.place}</p>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <div className="chips small">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="Experience" title="Internships & training">
          <ol className="timeline">
            {internships.map((i, idx) => (
              <li key={i.org} data-reveal="" style={{ '--reveal-delay': `${idx * 80}ms` }}>
                <div className="dot" aria-hidden="true"><Microscope size={14} /></div>
                <div className="card">
                  <span className="period">{i.period}</span>
                  <h3>{i.org}</h3>
                  <p className="muted">{i.unit} · {i.place}</p>
                  <p>{i.note}</p>
                  <button type="button" className="link" onClick={() => openCert(i.cert)}>
                    View certificate <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="certificates" eyebrow="Certificates" title="Credentials & participation">
          <div className="filters" data-reveal="">
            {categories.map((c) => (
              <button
                type="button"
                key={c}
                className={c === filter ? 'active' : ''}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="cert-grid" data-reveal="">
            {shown.map((c) => (
              <button
                type="button"
                className="cert"
                key={c.id}
                onClick={() => setLb(certificates.findIndex((x) => x.id === c.id))}
              >
                <div className="thumb"><img src={c.img} alt={c.title} loading="lazy" /></div>
                <div className="meta">
                  <span className="badge"><Award size={12} aria-hidden="true" /> {c.category}</span>
                  <strong>{c.title}</strong>
                  <small>{c.issuer}</small>
                  <small>{c.date}</small>
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let's connect">
          <div className="contact">
            <a className="card" href={`mailto:${profile.email}`} data-reveal="">
              <span className="contact-icon" aria-hidden="true"><Mail size={20} /></span>
              <span>{profile.email}</span>
            </a>
            <a className="card" href={`tel:+91${profile.phone}`} data-reveal="" style={{ '--reveal-delay': '70ms' }}>
              <span className="contact-icon" aria-hidden="true"><Phone size={20} /></span>
              <span>+91 {profile.phone}</span>
            </a>
            <a
              className="card"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-reveal=""
              style={{ '--reveal-delay': '140ms' }}
            >
              <span className="contact-icon" aria-hidden="true"><Link2 size={20} /></span>
              <span>LinkedIn profile</span>
            </a>
          </div>
        </Section>
      </main>

      <footer>
        <div className="container">© {CURRENT_YEAR} Aparna S · {profile.location}</div>
      </footer>

      {lb !== null && (
        <Lightbox
          items={certificates}
          index={lb}
          onClose={() => setLb(null)}
          onNav={navLb}
        />
      )}
    </>
  )
}
