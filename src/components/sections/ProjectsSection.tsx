import type { Project } from '../../content/portfolio'
import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from './SectionTitle'

interface ProjectsSectionProps {
  projects: Project[]
}

interface ProjectStoryProps {
  active: boolean
  index: number
  project: Project
  storyRef: (element: HTMLElement | null) => void
}

function ProjectIllustration({ visual }: { visual: Project['visual'] }) {
  if (visual === 'library') {
    return (
      <div
        className="project-preview project-preview--library"
        aria-hidden="true"
      >
        <div className="project-preview__topbar">
          <span>TownLibrary</span>
          <span>Catalog</span>
        </div>
        <div className="project-preview__library">
          <span>Book listing</span>
          <span className="project-preview__status">Available</span>
          <span>Borrow a book</span>
          <span className="project-preview__status">Requested</span>
          <span>Request countdown</span>
          <span className="project-preview__status">Auto-expiry</span>
          <span>Account access</span>
          <span className="project-preview__status">Role-based</span>
        </div>
        <div className="project-preview__footer">Borrow · Return · Status</div>
      </div>
    )
  }

  if (visual === 'delivery') {
    return (
      <div
        className="project-preview project-preview--delivery"
        aria-hidden="true"
      >
        <div className="project-preview__topbar">
          <span>ShipEasy</span>
          <span>Order tracking</span>
        </div>
        <div className="project-preview__steps">
          <span>Order placed · In transit</span>
          <span>Live shipment tracking</span>
          <span>Chat support</span>
        </div>
        <div className="project-preview__footer">
          <span className="project-preview__status">Live location</span>
          Status updates
        </div>
      </div>
    )
  }

  return (
    <div className="project-preview project-preview--film" aria-hidden="true">
      <div className="project-preview__topbar">
        <span>CineChain</span>
        <span>Film community</span>
      </div>
      <div className="project-preview__profile">
        <span className="project-preview__avatar">CC</span>
        <span>Professional profile</span>
      </div>
      <div className="project-preview__directory">
        <span>Company pages</span>
        <span>Job listings</span>
        <span className="project-preview__status">Role-based access</span>
      </div>
      <div className="project-preview__footer">
        Portfolio · Connections · Open roles
      </div>
    </div>
  )
}

function ProjectStory({ active, index, project, storyRef }: ProjectStoryProps) {
  return (
    <article
      ref={storyRef}
      className="project-story"
      data-active={active}
      data-project-index={index}
      aria-current={active ? 'step' : undefined}
      aria-labelledby={`project-title-${index + 1}`}
    >
      <figure className="project-story__mobile-visual">
        <ProjectIllustration visual={project.visual} />
        <figcaption>
          {project.title} · Illustrative interface concept
        </figcaption>
      </figure>
      <div className="project-story__content">
        <div className="project-story__meta">
          <span>{`0${index + 1}`}</span>
          <span>{project.category}</span>
        </div>
        <h3 id={`project-title-${index + 1}`}>{project.title}</h3>
        <p>{project.description}</p>
        <h4>Highlights</h4>
        <ul className="project-story__features">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <ul
          className="project-story__technologies"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const storyRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => {
            const viewportCenter = window.innerHeight / 2
            const firstCenter =
              first.boundingClientRect.top + first.boundingClientRect.height / 2
            const secondCenter =
              second.boundingClientRect.top +
              second.boundingClientRect.height / 2

            return (
              Math.abs(firstCenter - viewportCenter) -
              Math.abs(secondCenter - viewportCenter)
            )
          })[0]

        if (activeEntry?.target instanceof HTMLElement) {
          const nextIndex = Number(activeEntry.target.dataset.projectIndex)
          if (Number.isInteger(nextIndex)) {
            setActiveIndex(nextIndex)
          }
        }
      },
      {
        rootMargin: '-38% 0px -38% 0px',
        threshold: 0,
      },
    )

    storyRefs.current.forEach((story) => {
      if (story) {
        observer.observe(story)
      }
    })

    return () => observer.disconnect()
  }, [projects.length])

  const activeProject = projects[activeIndex]

  return (
    <section
      className="content-section section-wrap"
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Projects</p>
          <SectionTitle id="projects-title">Projects</SectionTitle>
        </div>
      </div>
      <div className="project-showcase">
        <div className="project-stories">
          {projects.map((project, index) => (
            <ProjectStory
              key={project.title}
              active={index === activeIndex}
              index={index}
              project={project}
              storyRef={(element) => {
                storyRefs.current[index] = element
              }}
            />
          ))}
        </div>
        {activeProject && (
          <aside
            className="project-stage"
            aria-label="Project interface concepts"
          >
            <div className="project-stage__header">
              <p className="eyebrow">Interface concept</p>
              <p
                className="project-stage__current"
                aria-live="polite"
                aria-atomic="true"
              >
                <span>{`0${activeIndex + 1} / 0${projects.length}`}</span>
                <span>{activeProject.title}</span>
              </p>
              <ol className="project-stage__progress" aria-hidden="true">
                {projects.map((project, index) => (
                  <li
                    key={project.title}
                    data-complete={index <= activeIndex}
                    data-active={index === activeIndex}
                  />
                ))}
              </ol>
            </div>
            <div className="project-stage__visuals">
              {projects.map((project, index) => (
                <figure
                  key={project.title}
                  className="project-stage__visual"
                  data-active={index === activeIndex}
                  aria-hidden={index !== activeIndex}
                >
                  <ProjectIllustration visual={project.visual} />
                  <figcaption>
                    {project.title} · Illustrative interface concept
                  </figcaption>
                </figure>
              ))}
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
