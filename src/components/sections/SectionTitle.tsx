interface SectionTitleProps {
  id: string
  children: string
}

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className="section-title">
      <span>{children}</span>
      <span className="section-title__period" aria-hidden="true">
        .
      </span>
    </h2>
  )
}
