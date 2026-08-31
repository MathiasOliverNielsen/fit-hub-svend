import { useState } from 'react'
import { Card } from '../../components'
import './Calendar.scss'

export function Calendar() {
  const [events, setEvents] = useState([])

  return (
    <div className="calendar-page">
      <div className="page-header">
        <h1>Min kalender</h1>
      </div>

      <div className="calendar-container">
        {events.length === 0 && (
          <p className="empty-state">Du har ikke meldt dig til nogle hold endnu</p>
        )}
        {events.map(event => (
          <Card key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.date} - {event.time}</p>
            <p>{event.location}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
