import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '../components'
import './pages.scss'

export function Classes() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch classes from API
    setLoading(false)
  }, [])

  return (
    <div className="page classes-page">
      <div className="page-header">
        <h1>Træningshold</h1>
        <Link to="/search" className="search-link">
          Søg
        </Link>
      </div>

      <div className="classes-list">
        {classes.length === 0 && !loading && (
          <p className="empty-state">Ingen hold fundet</p>
        )}
        {classes.map(cls => (
          <Card key={cls.id}>
            <h3>{cls.name}</h3>
            <p>{cls.description}</p>
            <Link to={`/classes/${cls.id}`}>
              <Button fullWidth>Se detaljer</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
