interface AboutSectionProps {
  description: string
}

export function AboutSection({ description }: AboutSectionProps) {
  return (
    <section
      className="content-section about-section section-wrap"
      id="about"
      aria-labelledby="about-title"
    >
      <p className="eyebrow">02 / A little context</p>
      <div className="about-section__content">
        <h2 id="about-title">About</h2>
        <p className="about-section__description">{description}</p>
      </div>
    </section>
  )
}
