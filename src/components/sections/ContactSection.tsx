interface ContactSectionProps {
  email: string | null
}

export function ContactSection({ email }: ContactSectionProps) {
  return (
    <section
      className="contact-section section-wrap"
      id="contact"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">04 / Start a conversation</p>
      <div className="contact-section__body">
        <div>
          <h2 id="contact-title">Contact</h2>
          <p>
            {email
              ? 'For enquiries and thoughtful collaborations, reach out by email.'
              : 'Contact details have not been supplied. Add a public email address in src/content/portfolio.ts before publishing.'}
          </p>
        </div>
        {email ? (
          <a className="button button--primary" href={`mailto:${email}`}>
            Email me <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a className="contact-section__fallback" href="#top">
            Return to the top <span aria-hidden="true">↑</span>
          </a>
        )}
      </div>
    </section>
  )
}
