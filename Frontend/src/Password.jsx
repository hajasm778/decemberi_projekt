import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Password() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const response = await fetch("http://localhost:3778/password", {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()

            if (response.ok) {
                setSuccess("✅ Sikeres jelszó módosítás!")
                setEmail("")
                setPassword("")
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

                <h2 className="text-center mb-4 text-success fw-bold">🔒 Jelszó módosítás</h2>

                <div className="card-body p-4">
                    {success && <div className="alert alert-success text-center">{success}</div>}
                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <form onSubmit={handleUpdatePassword}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">📧 Email cím</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control border-success"
                                placeholder="pelda@email.com"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold">🔑 Új jelszó</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control border-success"
                                placeholder="Új jelszó"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-success w-100 fw-bold shadow-sm"
                        >
                            {loading ? "Feldolgozás..." : "Jelszó módosítása"}
                        </button>
                    </form>
                </div>

                <div className="card-footer text-center bg-light">
                    <Link to="/login" className="text-success text-decoration-none">
                        🔙 Vissza a bejelentkezéshez
                    </Link>
                </div>

            </div>
        </div>
    )
}
