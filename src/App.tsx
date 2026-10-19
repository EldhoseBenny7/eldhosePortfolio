import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { EducationSection } from './components/sections/EducationSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'
import { portfolio } from './content/portfolio'

function App() {
  return (
    <div id="top" className="site-shell">
      <SiteHeader name={portfolio.name} navigation={portfolio.navigation} />
      <div className="site-content">
        <main id="main-content">
          <HeroSection
            role={portfolio.role}
            introduction={portfolio.introduction}
          />
          <AboutSection
            description={portfolio.about}
            capabilityGroups={portfolio.capabilityGroups}
          />
          <EducationSection education={portfolio.education} />
          <ProjectsSection projects={portfolio.projects} />
          <ContactSection contact={portfolio.contact} />
        </main>
        <SiteFooter name={portfolio.name} />
      </div>
    </div>
  )
}

export default App
