import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../components/Login";
import type { User } from "../../../domain/model/user"; 

const mockLogin = jest.fn();

jest.mock("../../../domain/hook/use.login.hook", () => ({
    useLogin: () => ({
        login: mockLogin,
    }),
}));

describe("Login", () => {
    beforeEach(() => {
        mockLogin.mockReset();
    });

    it("Devrait afficher les champs email/password et envoie les valeurs au submit", async () => {
        const user = userEvent.setup();

        const initial: User = {
        id: "",
        name: "",
        email: "a@a.com",
        password: "old",
        };

        render(<Login login={initial} />);

        const emailInput = screen.getByLabelText("email") as HTMLInputElement;
        const passwordInput = screen.getByLabelText("password") as HTMLInputElement;

        await user.clear(emailInput);
        await user.type(emailInput, "test@mail.com");

        await user.clear(passwordInput);
        await user.type(passwordInput, "secret");

        await user.click(screen.getByRole("button", { name: /login/i }));

        expect(mockLogin).toHaveBeenCalledTimes(1);
        expect(mockLogin).toHaveBeenCalledWith({
        id: "",
        name: "",
        email: "test@mail.com",
        password: "secret",
        });
    });
});
