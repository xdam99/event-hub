jest.mock("react-router-dom", () => ({
    Navigate: () => null,
}));

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/auth/auth.slice";
import {Profile} from "../components/Profile";
import type { User } from "../../model/user";

const mockUser: User = {
    id: "1",
    name: "Test User",
    email: "test@test.com",
    password: "1234",
};

function renderWithStore(user: User | null) {
    const store = configureStore({
        reducer: {
        auth: authReducer,
        },
        preloadedState: {
        auth: {
            user,
            error: null,
        },
        },
    });

    return render(
        <Provider store={store}>
            <Profile />
        </Provider>
    );
}

describe("Profile", () => {
    it("should display user information when user is logged in", () => {
        renderWithStore(mockUser);

        expect(screen.getByText(/test user/i)).toBeInTheDocument();
        expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    });

    it("should not display user information when user is not logged in", () => {
        renderWithStore(null);

        expect(screen.queryByText(/test user/i)).not.toBeInTheDocument();
    });
});
