import { useState } from "react";
import { useAppSelector } from "../../store/store";
import { UpdateProfile } from "../../updateProfile/components/UpdateProfile";

import "./ui/Profile.css";

export const Profile = () => {
    const user = useAppSelector((state) => state.auth.user);
    const [editing, setEditing] = useState(false);

    
    if (!user) {
        return <p>Vous n'êtes pas connecté</p>;
    }
    return (
        <section className="profile">
            <div className="profile-content">

                <h1 className="profile-content-title">{user.name}</h1>
                <p>{user.email}</p>

                {!editing && (
                    <button onClick={() => setEditing(true)}>
                        Edit profile
                    </button>
                )}

                {editing && (
                    <UpdateProfile
                        user={user}
                        onDone={() => setEditing(false)}
                    />
                )}
            </div>

        </section>
    );
};
