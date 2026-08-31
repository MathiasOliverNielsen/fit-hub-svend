import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../components'
import './pages.scss'

export function ClassDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [classData, setClassData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch class details from API
    setLoading(false)
  }, [id])

  if (loading) return <div className="page">Loading...</div>
  if (!classData) return <div className="page">Hold ikke fundet</div>

  return (
    <div className="page class-detail-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Tilbage</button>
        <h1>{classData.name}</h1>
      </div>

      <div className="class-info">
        <p>{classData.description}</p>
        <p>Instruktør: {classData.instructor}</p>
        <p>Tid: {classData.time}</p>
        <p>Sted: {classData.location}</p>
      </div>

      <Button fullWidth>Join hold</Button>
    </div>
  )
}
