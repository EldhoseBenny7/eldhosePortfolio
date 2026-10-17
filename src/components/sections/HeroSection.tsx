interface HeroSectionProps {
  name: string
  role: string
  introduction: string
}

export function HeroSection({ name, role, introduction }: HeroSectionProps) {
  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">
          <span className="eyebrow__marker" aria-hidden="true" />
          Independent portfolio
        </p>
        <h1 id="hero-title">
          {name}
          <span className="hero__period" aria-hidden="true">
            .
          </span>
        </h1>
        <p className="hero__role">{role}</p>
        <p className="hero__introduction">{introduction}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#projects">
            Explore selected projects
            <span aria-hidden="true">↘</span>
          </a>
          <a className="button button--secondary" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <div
        className="hero-visual"
        role="img"
        aria-label="Reserved space for a future interactive visual"
      >
        <div className="hero-visual__topline">
          <span>Visual study</span>
          <span>In progress</span>
        </div>
        <div className="hero-visual__center">
          <span className="hero-visual__index" aria-hidden="true">
            01
          </span>
          <p>Space reserved for an interactive visual.</p>
        </div>
        <div className="hero-visual__bottomline">
          <span>Interactive scene</span>
          <span>Coming in a later stage</span>
        </div>
      </div>
      <a className="hero__scroll" href="#projects">
        Scroll to explore <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
