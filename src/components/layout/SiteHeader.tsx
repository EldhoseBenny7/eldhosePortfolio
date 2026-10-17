import type { NavigationItem } from '../../content/portfolio'

interface SiteHeaderProps {
  name: string
  navigation: NavigationItem[]
}

export function SiteHeader({ name, navigation }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="#top"
        aria-label={`${name}, home`}
      >
        <span className="site-header__mark" aria-hidden="true">
          +
        </span>
        {name}
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a className="site-nav__link" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
