import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(()=>{
        const LoadProfile = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch("http://localhost:3778/profile",{
                    headers : {"Authorization" : `Bearer ${token}`}
                })
                const data = await response.json()
                if(response.ok){
                    setUsername(data.username)
                    setEmail(data.email)
                    setAddress(data.address || "")
                    setPhone(data.phone_number || "")
                } else {
                    setError(data.message)
                }
            } catch (error) {
                setError(error.message)
            }
        }
        LoadProfile()
    },[])

    const handleProfileSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess("")

        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:3778/profile",{
                method : "PUT",
                headers: {
                    "Content-type" : "application/json", 
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify({username, email, address, phone_number : phone})
            })
            const data = await response.json()

            if(response.ok){
                setSuccess("✅ Sikeres volt a profil frissítése")
            } else {
                setError(data.message)
            }

        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%", borderTop: "6px solid #079c20ff" }}>
                <h2 className="text-center text-success mb-3">👤 Profil szerkesztése</h2>
                <p className="text-center text-muted mb-4">Itt tudod frissíteni személyes adataidat</p>

                {success && <div className="alert alert-success text-center">{success}</div>}
                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleProfileSave}>
                    <div className="mb-3">
                        <label className="form-label text-success">Felhasználónév</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-success">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control"/>
                    </div>

                    <div className="mb-3">
                        <label className="form-label text-success">Cím</label>
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="form-control"/>
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-success">Telefonszám</label>
                        <input 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="form-control"/>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="btn btn-success w-100 fw-bold py-2">
                        {loading ? "Mentés folyamatban..." : "Profil mentése"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Profile;