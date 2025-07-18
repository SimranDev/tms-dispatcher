import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }
    setError('')

    // In a real app, you'd validate the password against a server.
    // Here, we just log the user in by updating the Zustand store.
    login({ username })

    // Navigate to the home page upon successful login.
    navigate('/', { replace: true })
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
              id="username"
              type="text"
              placeholder="e.g., jane.doe"
              className="input input-bordered"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
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
