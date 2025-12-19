import type { User } from "../../model/user";

export const useLogin = () => {
    function login(user: User) {
        const email = user.email?.trim();
        const password = user.password ?? "";

        if (!email || !password) {
        throw new Error("Email et mot de passe requis");
        }
        return user;
    }

    return {
        login,
    };
};
