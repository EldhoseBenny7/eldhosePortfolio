import { AboutSection } from './components/sections/AboutSection'
import { CapabilitiesSection } from './components/sections/CapabilitiesSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { portfolio } from './content/portfolio'

function App() {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader name={portfolio.name} navigation={portfolio.navigation} />
      <main id="main-content">
        <HeroSection
          name={portfolio.name}
          role={portfolio.role}
          introduction={portfolio.introduction}
        />
        <ProjectsSection projects={portfolio.projects} />
        <AboutSection description={portfolio.about} />
        <CapabilitiesSection capabilities={portfolio.capabilities} />
        <ContactSection email={portfolio.email} />
      </main>
      <SiteFooter name={portfolio.name} />
    </div>
  )
}

export default App
