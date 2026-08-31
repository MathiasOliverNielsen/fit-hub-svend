import { useState, useMemo } from 'react'
import { useSwipeable } from 'react-swipeable'
import { useFetch } from '../../hooks'
import { ClassCard } from './ClassCard'
import './Classes.scss'

const API_BASE = 'http://localhost:3000'

const getImageUrl = (url) => {
  if (url.startsWith('http')) return url
  return `${API_BASE}${url}`
}

export function Classes() {
  const [carouselOffset, setCarouselOffset] = useState(0)
  const { data, isLoading } = useFetch('/teams', { cache: true })
  const teams = data || []

  const featuredTeam = useMemo(() => {
    if (teams.length > 0) {
      return teams[Math.floor(Math.random() * teams.length)]
    }
    return null
  }, [teams.length])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCarouselOffset(prev => Math.min(prev + 1, teams.length - 3))
    },
    onSwipedRight: () => {
      setCarouselOffset(prev => Math.max(prev - 1, 0))
    },
  })

  if (isLoading) return <div className="classes-page">Loading...</div>

  return (
    <main className="classes-page">
      {featuredTeam && (
        <section className="hero-section">
          <h2 className="section-title">Popular Classes</h2>
          <ClassCard
            image={getImageUrl(featuredTeam.image.url)}
            name={featuredTeam.name}
            instructor={featuredTeam.user.name}
            variant="hero"
          />
        </section>
      )}

      <section className="carousel-section" {...handlers}>
        <h2 className="section-title">Classes for you</h2>
        <div className="carousel-container" style={{
          transform: `translateX(-${carouselOffset * (100 / 3)}%)`,
        }}>
          {teams.map(team => (
            <ClassCard
              key={team.id}
              image={getImageUrl(team.image.url)}
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
