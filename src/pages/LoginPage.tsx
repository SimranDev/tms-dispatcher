import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }
    setError('')

    axios
      .post(import.meta.env.VITE_API_BASE_URL + '/user-auth/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data)
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        console.error('Login error:', err)
        setError('Login failed. Please try again later.')
        localStorage.removeItem('accessToken')
      })
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          <h2 className="card-title mb-4 justify-center text-2xl font-bold">Welcome Back!</h2>
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="e.g., jane.doe@example.com"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-error mt-2 text-sm">{error}</p>}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
