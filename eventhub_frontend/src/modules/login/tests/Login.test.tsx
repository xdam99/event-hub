jest.mock("react-router-dom", () => ({
    Navigate: () => null,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/auth/auth.slice";
import { Login } from "../components/Login";

function renderWithStore() {
    const store = configureStore({
        reducer: {
        auth: authReducer,
        },
    });

    return render(
        <Provider store={store}>
        <Login />
        </Provider>
    );
}

describe("Login component", () => {
    it("should render email and password inputs", () => {
        renderWithStore();

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("should enable submit when email and password are filled", () => {
        renderWithStore();

        fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "test@test.com" },
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "1234" },
        });

        expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
    });
});
