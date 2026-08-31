import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputField, Card, Button } from '../../components'
import './Search.scss'

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    // TODO: Implement search logic
  }

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Søg hold</h1>
      </div>

      <InputField
        placeholder="Søg efter hold..."
        value={query}
        onChange={handleSearch}
        autoFocus
      />

      <div className="search-results">
        {results.length === 0 && query && (
          <p className="empty-state">Ingen resultater</p>
        )}
        {results.map(cls => (
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
