import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("http://localhost:3778/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          address,
          phone_number: Number(phone_number)
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess("Sikeres volt a regisztráció!")
        setUsername("")
        setEmail("")
        setPassword("")
        setAddress("")
        setPhone_number("")
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

        {success && <div className="alert alert-success text-center">{success}</div>}

        <h2 className="text-center mb-4 text-success fw-bold">Regisztráció</h2>

        <form onSubmit={handleRegister} className="d-flex flex-column gap-3">

          <div className="form-group">
            <label className="fw-semibold">Felhasználónév</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control border-success"
              required
            />
          </div>

          <div className="form-group">
            <label className="fw-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-success"
              required
            />
          </div>

          <div className="form-group">
            <label className="fw-semibold">Jelszó</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control border-success"
              required
            />

            <label className="fw-semibold mt-2">Lakcím</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control border-success"
              required
            />

            <label className="fw-semibold mt-2">Telefonszám</label>
            <input
              type="number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              className="form-control border-success"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-100 fw-semibold"
          >
            {loading ? "Töltés..." : "Regisztráció"}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
      </div>
    </div>
  )
}