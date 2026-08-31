import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks'
import { InputField, Button } from '../../components'
import './Login.scss'

export function Login() {
  const navigate = useNavigate()
  const form = useForm({ email: '', password: '' })

  const handleSubmit = form.handleSubmit(async (values) => {
    // TODO: Call API to login
    console.log('Login:', values)
    navigate('/classes')
  })

  return (
    <div className="login-page">
      <div className="page-header">
        <h1>Log ind</h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <InputField
          name="email"
          type="email"
          label="Email"
          value={form.values.email}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.email && form.errors.email}
        />

        <InputField
          name="password"
          type="password"
          label="Adgangskode"
          value={form.values.password}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.password && form.errors.password}
        />

        <Button type="submit" fullWidth loading={form.isSubmitting}>
          Log ind
        </Button>
      </form>
    </div>
  )
}
