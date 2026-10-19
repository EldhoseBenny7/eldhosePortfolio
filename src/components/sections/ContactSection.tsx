import type { ContactDetails } from '../../content/portfolio'
import { useInViewReveal } from '../../hooks/useInViewReveal'
import { SectionTitle } from './SectionTitle'

interface ContactSectionProps {
  contact: ContactDetails
}

export function ContactSection({ contact }: ContactSectionProps) {
  const { ref, isRevealed } = useInViewReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="contact-section section-wrap"
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      data-revealed={isRevealed}
    >
      <p className="eyebrow">04 / Start a conversation</p>
      <div className="contact-section__body">
        <div>
          <SectionTitle id="contact-title">Contact</SectionTitle>
          <p>
            Have a project or opportunity in mind? Email me or connect on
            LinkedIn.
          </p>
        </div>
        <a
          className="button button--primary contact-section__email"
          href={`mailto:${contact.email}`}
        >
          {contact.email}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ul className="contact-links" aria-label="Social profiles">
        <li>
          <a href={contact.github} aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.64-1.24-1.64-1.01-.69.08-.67.08-.67 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.6 10.6 0 0 1 5.56 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.02.76 2.06v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
              />
            </svg>
            <span>GitHub</span>
          </a>
        </li>
        <li>
          <a href={contact.linkedIn}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.9H4.97V9.37h2.96v9.53ZM6.45 8.07a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19.03 18.9h-2.96v-4.64c0-1.1-.02-2.51-1.53-2.51-1.54 0-1.78 1.2-1.78 2.43v4.72H9.8V9.37h2.84v1.3h.04c.4-.75 1.36-1.53 2.8-1.53 2.99 0 3.55 1.97 3.55 4.53v5.23Z"
              />
            </svg>
            <span>LinkedIn</span>
          </a>
        </li>
      </ul>
    </section>
  )
}
