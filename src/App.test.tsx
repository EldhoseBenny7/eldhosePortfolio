import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.tsx'

afterEach(() => cleanup())

describe('App', () => {
  it('renders the portfolio structure and section navigation', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Full-Stack Web Developer',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {
        name: /open laptop displaying a portfolio website/i,
      }),
    ).toBeInTheDocument()
    const heroTitle = screen.getByRole('heading', {
      level: 1,
      name: 'Full-Stack Web Developer',
    })
    expect(heroTitle).toHaveTextContent('Full-Stack')
    expect(heroTitle).toHaveTextContent('Web')
    expect(heroTitle).toHaveTextContent('Developer')
    expect(screen.getByText('ELDHOSE')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explore projects/i }),
    ).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeInTheDocument()
    for (const section of ['About', 'Education', 'Projects', 'Contact']) {
      expect(screen.getByRole('link', { name: section })).toHaveAttribute(
        'href',
        `#${section.toLowerCase()}`,
      )
    }
    expect(
      screen.getByRole('heading', { level: 2, name: 'About' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Education' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Projects' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Contact' }),
    ).toBeInTheDocument()
  })

  it('shows the supplied biography, education, and project case studies', () => {
    render(<App />)

    expect(
      screen.getByText(/I'm Eldhose Benny, a developer building responsive/),
    ).toBeInTheDocument()
    const about = screen.getByRole('region', { name: 'About' })
    expect(about).toHaveTextContent(
      'My projects include CineChain, ShipEasy, and TownLibrary',
    )
    expect(about).toHaveTextContent(
      'I value clear, maintainable code, collaborative problem-solving',
    )
    for (const capability of [
      'JavaScript',
      'C++',
      'Java',
      'MERN stack',
      'MySQL',
      'MongoDB',
      'GitHub',
      'Communication',
      'Collaboration',
    ]) {
      expect(within(about).getByText(capability)).toBeInTheDocument()
    }
    expect(within(about).getByText('Tools & technologies')).toBeInTheDocument()
    expect(within(about).getByText('Interpersonal skills')).toBeInTheDocument()

    const education = screen.getByRole('region', { name: 'Education' })
    expect(education).toHaveTextContent('Bachelor of Computer Applications')
    expect(education).toHaveTextContent('BCA · 2023–2026')
    expect(education).toHaveTextContent('CGPA · 7.8')
    expect(education).toHaveTextContent(
      'Higher Secondary / 10+2 — Computer Science',
    )
    expect(education).toHaveTextContent('89%')
    expect(education).toHaveTextContent('Class 10')
    expect(education).toHaveTextContent('95.5%')

    const projects = screen.getByRole('region', { name: 'Projects' })
    expect(within(projects).getAllByRole('article')).toHaveLength(3)
    expect(within(projects).getByText('01 / 03')).toBeInTheDocument()
    expect(
      within(projects).getByRole('list', { name: 'TownLibrary technologies' }),
    ).toHaveTextContent('PHP')
    expect(
      within(projects).getByRole('article', {
        name: 'TownLibrary',
        current: 'step',
      }),
    ).toBeInTheDocument()
    for (const project of ['TownLibrary', 'ShipEasy', 'CineChain']) {
      expect(
        within(projects).getByRole('heading', {
          level: 3,
          name: project,
        }),
      ).toBeInTheDocument()
    }
    expect(projects).toHaveTextContent(
      'Countdowns before borrow requests expire',
    )
    expect(projects).toHaveTextContent(
      'Live shipment tracking with status updates',
    )
    expect(projects).toHaveTextContent(
      'Role-based access for users and administrators',
    )
    expect(within(projects).queryByRole('link')).not.toBeInTheDocument()
  })

  it('provides working email and icon links without a phone number', () => {
    render(<App />)

    expect(
      screen.getByRole('link', { name: 'eldhose.benny.work@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:eldhose.benny.work@gmail.com')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/EldhoseBenny7',
    )
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/eldhose-benny-149005277',
    )
    expect(document.querySelector('a[href^="tel:"]')).toBeNull()
  })

  it('toggles the section navigation and restores focus on Escape', () => {
    render(<App />)

    const menuButton = screen.getByRole('button', {
      name: 'Close section navigation',
    })
    fireEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(menuButton, { key: 'Escape' })

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveFocus()
  })

  it('moves focus to the selected section after navigation', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: 'Education' }))

    expect(document.getElementById('education')).toHaveFocus()
  })
})
