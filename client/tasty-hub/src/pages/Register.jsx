import { useState } from "react"
import http from "../api/http"
import { Link, useNavigate } from "react-router"
import Swal from "sweetalert2"
import axios from "axios"


const RegisterPage = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            await http({
                method: "post",
                url: `/register`,
                data: {
                    username,
                    email,
                    password
                }
            })

            navigate("/login")
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message,
            });
        }
    }

    return (
        <>
            <div className="container">
                <h1>Register</h1>
                <form
                    onSubmit={handleRegister}
                >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            aria-describedby="emailHelp"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <p>You have account? <Link to="/login">Login now</Link></p>
                </form>
            </div>

        </>
    )
}

export default RegisterPage