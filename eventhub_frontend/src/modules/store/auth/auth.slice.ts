import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../model/user";



export interface AuthState {
    user: User | null;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginRequest(
            state,
            action: PayloadAction<{ email: string; password: string }>
        ) {
            state.user = {
                id: "1",
                name: "Damien JOSSE",
                email: action.payload.email,
                password: action.payload.password,
            };
            state.error = null;
        },

        updateUser(state, action: PayloadAction<User>) {
            if (!state.user) return;
            state.user = action.payload;
        },

        logout(state) {
            state.user = null;
        },
    },
});

export const { loginRequest, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

