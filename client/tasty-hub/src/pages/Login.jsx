import { useEffect, useState } from "react";
import http from "../api/http";
import { Link, Navigate, useNavigate } from "react-router-dom";
import handleApiError from "../api/handleError";

const Login = () => {
    const navigate = useNavigate();

    if (localStorage.getItem("access_token")) {
        return <Navigate to="/" />
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await http.post("/login", { email, password });
            console.log(response.data, "<<< data")
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/products");
        } catch (error) {
            handleApiError(error);
        }
    };

    async function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const response = await http({
                method: "post",
                url: `/login/google`,
            })
    
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/products");
        } catch (err) {
            console.log(err, "<<< error")
        }
      }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/products");
        }

        google.accounts.id.initialize({
            client_id: "1004156953817-6kc6gmn8k4jesm64bkmnuce3ajsn0fso.apps.googleusercontent.com", 
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("google-button"),
            { theme: "outline", size: "large" }  // customization attributes
          );
        //   google.accounts.id.prompt(); // also display the One Tap dialog
    } )

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p>You have not account? <Link to="/register">register now</Link></p>
            </form>

            <div id="google-button"></div>
        </div>
    );
}

export default Login;
