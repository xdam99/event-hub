import * as React from "react";
import { useState } from "react";

import { CheckPassword } from "./checkPassword/components/CheckPassword";

import "../ui/Register.css";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
}

export const Register: React.FC = () => {
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const isFormValid =
        form.name.trim() !== "" &&
        form.email.trim() !== "" &&
        isPasswordValid;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!isFormValid) return;

        console.log("Utilisateur inscrit :", form);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form-content">
                <h2>S'inscrire</h2>
                <input
                    name="name"
                    placeholder="Nom"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={form.password}
                    onChange={handleChange}
                />

                <CheckPassword
                    password={form.password}
                    onValidityChange={setIsPasswordValid}
                />

                <button className="register-button" type="submit" disabled={!isFormValid}>
                    S'inscrire
                </button>

            </div>

        </form>
    );
};
