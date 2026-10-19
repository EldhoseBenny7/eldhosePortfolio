import type { Education } from '../../content/portfolio'
import { useInViewReveal } from '../../hooks/useInViewReveal'
import { SectionTitle } from './SectionTitle'

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  const { ref, isRevealed } = useInViewReveal<HTMLOListElement>()

  return (
    <section
      className="content-section section-wrap"
      id="education"
      tabIndex={-1}
      aria-labelledby="education-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Learning</p>
          <SectionTitle id="education-title">Education</SectionTitle>
        </div>
      </div>
      <ol
        ref={ref}
        className="education-timeline"
        aria-label="Education history"
        data-revealed={isRevealed}
      >
        {education.map((entry) => (
          <li className="education-entry" key={entry.qualification}>
            <p className="education-entry__period">{entry.period}</p>
            <div className="education-entry__details">
              <h3>{entry.qualification}</h3>
              <p className="education-entry__institution">
                {entry.institution}
              </p>
            </div>
            <p className="education-entry__result">{entry.result}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
