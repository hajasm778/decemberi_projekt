import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:3778/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        setIsLoggedIn(true)
        navigate("/")
      } else {
        setError(data.message)
      }

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success bg-gradient p-3">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "420px" }}>

        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}

        <h2 className="text-center mb-4 text-success fw-bold">Bejelentkezés</h2>

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="fw-semibold">Felhasználónév</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control border-success"
            />
          </div>

          <div className="form-group">
            <label className="fw-semibold">Jelszó</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-success"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 fw-semibold"
          >
            {loading ? "Töltés..." : "Bejelentkezés"}
          </button>

          <p className="text-center mt-2">
            <Link className="text-success fw-semibold" to={"/password"}>
              Elfelejtetted a jelszavad?
            </Link>
          </p>
        </form>

        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
      </div>
    </div>
  )
}
