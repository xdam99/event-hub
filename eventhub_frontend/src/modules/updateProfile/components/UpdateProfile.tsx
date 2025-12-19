import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { updateUser } from "../../store/auth/auth.slice";
import type { User } from "../../model/user";

import "./ui/UpdateProfile.css";

interface Props {
    user: User;
    onDone: () => void;
}

export const UpdateProfile = ({ user, onDone }: Props) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(
            updateUser({
                ...user,
                name,
                email,
            })
        );

        setMessage("Profile successfully updated");
        onDone();
    };

    return (
        <form className="update-profile-form" onSubmit={handleSubmit}>
            <div>
                <label>Nom</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button type="submit">Mettre à jour</button>

            {message && <p>{message}</p>}
        </form>
    );
};
