jest.mock("react-router-dom", () => ({
    Navigate: () => null,
}));

import { render, screen, fireEvent } from "@testing-library/react";
import { Register } from "../components/Register";

describe("Register component", () => {
    it("should disable submit button when form is incomplete", () => {
        render(<Register />);

        expect(
        screen.getByRole("button", { name: /s'inscrire/i })
        ).toBeDisabled();
    });

    it("should enable submit button when form is valid", () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/nom/i), {
        target: { value: "Damien" },
        });

        fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "test@test.com" },
        });

        fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
        target: { value: "Test1234****" },
        });

        expect(
        screen.getByRole("button", { name: /s'inscrire/i })
        ).toBeEnabled();
    });

    it("should prevent submission when password is invalid", () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
        target: { value: "Test" },
        });

        expect(
        screen.getByRole("button", { name: /s'inscrire/i })
        ).toBeDisabled();
    });
});
