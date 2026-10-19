import { useEffect, useState } from 'react'
import { HeroVisual } from './HeroVisual'

interface HeroSectionProps {
  role: string
  introduction: string
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia !== 'function' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function HeroSection({ role, introduction }: HeroSectionProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    prefersReducedMotion() ? role.length : 0,
  )
  const roleWords = role.split(' ')
  const accentWord = roleWords.pop() ?? ''
  const roleLead = roleWords.join(' ')
  const roleFirstLine = roleLead.replace(/ Web$/, '')
  const roleSecondLine = roleLead.endsWith(' Web') ? 'Web' : ''
  const firstLineStart = 0
  const secondLineStart = roleFirstLine.length + 1
  const accentStart = roleLead.length + 1

  useEffect(() => {
    if (prefersReducedMotion()) return

    let character = 0
    let timeoutId: number
    const typeNextCharacter = () => {
      if (character === role.length) {
        timeoutId = window.setTimeout(() => {
          character = 0
          setVisibleCharacters(0)
          timeoutId = window.setTimeout(typeNextCharacter, 350)
        }, 1200)
        return
      }

      character += 1
      setVisibleCharacters(character)
      timeoutId = window.setTimeout(typeNextCharacter, 95)
    }

    timeoutId = window.setTimeout(typeNextCharacter, 95)
    return () => window.clearTimeout(timeoutId)
  }, [role])

  const renderTypedLine = (text: string, start: number) =>
    [...text].map((character, index) => (
      <span
        key={`${start}-${index}`}
        style={{
          visibility: visibleCharacters > start + index ? 'visible' : 'hidden',
        }}
      >
        {character === ' ' ? '\u00a0' : character}
      </span>
    ))

  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <p className="hero__brand">
        <span className="hero__monogram" aria-hidden="true">
          EB
        </span>
        ELDHOSE
      </p>
      <div className="hero__copy">
        <h1 id="hero-title" aria-label={role}>
          <span className="hero__title-text" aria-hidden="true">
            <span className="hero__title-line">
              {renderTypedLine(roleFirstLine, firstLineStart)}
            </span>
            {roleSecondLine && (
              <span className="hero__title-line">
                {renderTypedLine(roleSecondLine, secondLineStart)}
              </span>
            )}
            <span className="hero__title-accent">
              {renderTypedLine(accentWord, accentStart)}
              {visibleCharacters >= role.length && (
                <span className="hero__period">.</span>
              )}
            </span>
          </span>
        </h1>
        <p className="hero__introduction">{introduction}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            Explore projects
            <span aria-hidden="true">↗</span>
          </a>
          <a className="button button--secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  )
}
