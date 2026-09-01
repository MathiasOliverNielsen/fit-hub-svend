import { useMemo } from 'react'
import { useFetch } from '../../hooks'
import { ClassCard } from './ClassCard'
import './Classes.scss'

export function Classes() {
  const { data, isLoading } = useFetch('/teams', { cache: true })
  const teams = data || []

  const featuredTeam = useMemo(() => {
    if (teams.length > 0) {
      return teams[Math.floor(Math.random() * teams.length)]
    }
    return null
  }, [teams.length])

  if (isLoading) return <div className="classes-page">Loading...</div>

  return (
    <main className="classes-page">
      {featuredTeam && (
        <section className="hero-section">
          <h2 className="section-title">Popular Classes</h2>
          <ClassCard
            image={featuredTeam.image.url}
            name={featuredTeam.name}
            instructor={featuredTeam.user.name}
            variant="hero"
          />
        </section>
      )}

      <section className="carousel-section">
        <h2 className="section-title">Classes for you</h2>
        <div className="carousel-container">
          {teams.map(team => (
            <ClassCard
              key={team.id}
              image={team.image.url}
              name={team.name}
              rating={5}
              variant="carousel"
            />
          ))}
        </div>
      </section>
    </main>
  )
}
