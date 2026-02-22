import { Link, useNavigate } from "react-router";
import { useState } from "react";

import api from "../../api/api";
import user from "../../api/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (<>
        <h1 className="">Log in</h1>

        <form className="" onSubmit={async event => {
            event.preventDefault();

            const response = await api.publicPost('login', { email, password });
            if (api.evaluateResponse(response)) {  // Successful login
                if (typeof response.username === 'string') {
                    user.logIn(response.username);
                    navigate('/');  // Redirect to the main page
                }
            } else {
                // Register failed, show something went wrong message.
            }
        }}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    className="bg-neutral-200"
                    name="password" id="email" type="email"
                    autoFocus autoComplete="email" required
                    value={email}
                    onChange={event => { setEmail(event.target.value) }}
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                    className="bg-neutral-200"
                    name="password" id="password" type="password"
                    autoComplete="password" min="8" required
                    value={password}
                    onChange={event => { setPassword(event.target.value) }}
                />
            </div>

            <button className="bg-neutral-300 border-neutral-800 rounded-md hover:bg-neutral-400" type="submit">
                Log in!
            </button>
        </form>

        <p className="inline">Don't have an account yet? </p><Link to="/register">Register</Link>
    </>);
}
export default Login;