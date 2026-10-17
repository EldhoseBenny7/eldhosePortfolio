interface SiteFooterProps {
  name: string
}

export function SiteFooter({ name }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <a className="site-footer__brand" href="#top">
        {name}
      </a>
      <p>
        Portfolio foundation · Replace placeholder content before publishing.
      </p>
      <a className="site-footer__top" href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  )
}
