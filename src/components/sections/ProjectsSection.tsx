import type { Project } from '../../content/portfolio'

interface ProjectsSectionProps {
  projects: Project[]
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-card__visual" aria-hidden="true">
        <span>Project</span>
        <span>—</span>
      </div>
      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.category}</span>
          {project.status === 'placeholder' && (
            <span className="status-label">Content placeholder</span>
          )}
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      className="content-section section-wrap"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / Selected work</p>
          <h2 id="projects-title">Selected projects</h2>
        </div>
        <p className="section-heading__note">
          Project content is placeholder copy until real work is supplied.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
