import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../hook/use.login.hook";

import "./ui/Login.css";

export const Login = () => {
    const { login, user, error } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    if (user) {
        return <Navigate to="/profile" replace />;
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <div className="login-form-content">
                <h2>Connexion</h2>
                <label htmlFor="email">Email</label>
                <input
                    aria-label="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Mot de passe</label>
                <input
                    aria-label="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

            {error && <p>{error}</p>}

                <button aria-label="Se connecter" className="login-button" type="submit">Se connecter</button>
            </div>
        </form>
    );
};
