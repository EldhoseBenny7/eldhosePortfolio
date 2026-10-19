import type { NavigationItem } from '../../content/portfolio'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

const mobileBreakpoint = '(max-width: 900px)'

interface SiteHeaderProps {
  name: string
  navigation: NavigationItem[]
}

export function SiteHeader({ name, navigation }: SiteHeaderProps) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia?.(mobileBreakpoint).matches ?? false,
  )
  const [navigationOpen, setNavigationOpen] = useState(
    () => !(window.matchMedia?.(mobileBreakpoint).matches ?? false),
  )
  const [activeSection, setActiveSection] = useState('about')
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const displayedName = isMobile
    ? (name.split(' ')[0]?.toUpperCase() ?? name)
    : name

  useEffect(() => {
    const mediaQuery = window.matchMedia?.(mobileBreakpoint)

    if (!mediaQuery) {
      return
    }

    function updateBreakpoint() {
      setIsMobile(mediaQuery.matches)
      setNavigationOpen(!mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', updateBreakpoint)

    return () => {
      mediaQuery.removeEventListener('change', updateBreakpoint)
    }
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const observedSections = navigation
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null)
    const activeCandidates = new Set<HTMLElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return
          if (entry.isIntersecting) activeCandidates.add(entry.target)
          else activeCandidates.delete(entry.target)
        })

        const activationLine = window.innerHeight * 0.3
        const activeSection = [...activeCandidates].sort((first, second) => {
          const firstBounds = first.getBoundingClientRect()
          const secondBounds = second.getBoundingClientRect()
          const firstCenter = firstBounds.top + firstBounds.height / 2
          const secondCenter = secondBounds.top + secondBounds.height / 2

          return (
            Math.abs(firstCenter - activationLine) -
            Math.abs(secondCenter - activationLine)
          )
        })[0]

        if (activeSection) setActiveSection(activeSection.id)
      },
      {
        rootMargin: '-25% 0px -65% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      },
    )

    observedSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [navigation])

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && navigationOpen) {
      setNavigationOpen(false)
      toggleButtonRef.current?.focus()
    }
  }

  return (
    <header
      className={`site-sidebar${navigationOpen ? ' site-sidebar--open' : ' site-sidebar--collapsed'}`}
    >
      <a
        className="site-sidebar__brand"
        href="#top"
        aria-label={`${displayedName}, home`}
      >
        <span className="site-sidebar__monogram" aria-hidden="true">
          EB
        </span>
        <span>{displayedName}</span>
      </a>
      <button
        ref={toggleButtonRef}
        className="site-nav-toggle"
        type="button"
        aria-controls="site-navigation"
        aria-expanded={navigationOpen}
        aria-label={`${navigationOpen ? 'Close' : 'Open'} section navigation`}
        onClick={() => setNavigationOpen((open) => !open)}
        onKeyDown={handleKeyDown}
      >
        <span className="site-nav-toggle__label">Sections</span>
        <span
          className={`site-nav-toggle__icon${navigationOpen ? ' site-nav-toggle__icon--open' : ''}`}
          aria-hidden="true"
        />
      </button>
      <nav
        className="site-nav"
        id="site-navigation"
        aria-label="Main navigation"
      >
        {navigation.map((item) => {
          const sectionId = item.href.slice(1)

          return (
            <a
              className="site-nav__link"
              href={item.href}
              key={item.href}
              aria-current={
                activeSection === sectionId ? 'location' : undefined
              }
              onKeyDown={handleKeyDown}
              onClick={() => {
                setNavigationOpen(!isMobile)
                document
                  .getElementById(sectionId)
                  ?.focus({ preventScroll: true })
              }}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
