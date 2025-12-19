import * as React from "react";
import { useState } from "react";

import type { User } from "../../model/user";
import { useLogin } from "../hook/use.login.hook";

export const Login: React.FC<{
    login?: User;
}> = ({ login }) => {
    const { login: doLogin } = useLogin();

    const [form, setForm] = useState<User>(
        login ?? {
            id: "",
            name: "",
            email: "",
            password: "",
        }
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        doLogin(form);
    }

    return (
        <form onSubmit={handleSubmit}>
        <input
            aria-label="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
            aria-label="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Se connecter</button>
        </form>
    );
};
