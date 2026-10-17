import type { Capability } from '../../content/portfolio'

interface CapabilitiesSectionProps {
  capabilities: Capability[]
}

export function CapabilitiesSection({
  capabilities,
}: CapabilitiesSectionProps) {
  return (
    <section
      className="content-section capabilities-section section-wrap"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / What I bring</p>
          <h2 id="capabilities-title">Capabilities</h2>
        </div>
        <p className="section-heading__note">
          Add only the skills and tools that reflect your real practice.
        </p>
      </div>
      {capabilities.length > 0 ? (
        <ul className="capability-list">
          {capabilities.map((capability) => (
            <li className="capability-card" key={capability.name}>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-note">
          Capability details have not been added yet.
        </p>
      )}
    </section>
  )
}
