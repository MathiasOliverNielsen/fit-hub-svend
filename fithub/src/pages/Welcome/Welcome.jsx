import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import './Welcome.scss'

export function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>FitHub</h1>
        <p>Find og join træningshold</p>
        <Button onClick={() => navigate('/classes')} fullWidth>
          Kom i gang
        </Button>
        <Button onClick={() => navigate('/login')} variant="secondary" fullWidth>
          Log ind
        </Button>
      </div>
    </div>
  )
}
