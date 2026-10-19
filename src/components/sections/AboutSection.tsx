import { useInViewReveal } from '../../hooks/useInViewReveal'
import type { CapabilityGroup } from '../../content/portfolio'
import { SectionTitle } from './SectionTitle'

interface AboutSectionProps {
  description: string[]
  capabilityGroups: CapabilityGroup[]
}

export function AboutSection({
  description,
  capabilityGroups,
}: AboutSectionProps) {
  const { ref, isRevealed } = useInViewReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="content-section about-section section-wrap"
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      data-revealed={isRevealed}
    >
      <p className="eyebrow">01 / A little context</p>
      <div className="about-section__content">
        <SectionTitle id="about-title">About</SectionTitle>
        <div className="about-section__description">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="about-toolkit">
          {capabilityGroups.map((group) => (
            <div className="about-toolkit__group" key={group.label}>
              <h3>{group.label}</h3>
              <ul className="about-toolkit__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
