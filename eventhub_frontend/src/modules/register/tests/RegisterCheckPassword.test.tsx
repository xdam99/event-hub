import { render, screen } from "@testing-library/react";
import { CheckPassword } from "../../RegisterCheckPassword";

describe("CheckPassword component", () => {
    it("should display all password rules", () => {
        render(
        <CheckPassword password="" onValidityChange={jest.fn()} />
        );

        expect(
        screen.getByText(/12 caractères minimum/i)
        ).toBeInTheDocument();
        expect(
        screen.getByText(/une majuscule/i)
        ).toBeInTheDocument();
        expect(
        screen.getByText(/une minuscule/i)
        ).toBeInTheDocument();
        expect(
        screen.getByText(/un chiffre/i)
        ).toBeInTheDocument();
        expect(
        screen.getByText(/un caractère spécial/i)
        ).toBeInTheDocument();
    });

    it("should mark all rules as valid when password is strong", () => {
        const onValidityChange = jest.fn();

        render(
        <CheckPassword
            password="StrongPass1!"
            onValidityChange={onValidityChange}
        />
        );

        expect(onValidityChange).toHaveBeenCalledWith(true);
    });

    it("should mark password as invalid when rules are not respected", () => {
        const onValidityChange = jest.fn();

        render(
        <CheckPassword
            password="weak"
            onValidityChange={onValidityChange}
        />
        );

        expect(onValidityChange).toHaveBeenCalledWith(false);
    });
});
