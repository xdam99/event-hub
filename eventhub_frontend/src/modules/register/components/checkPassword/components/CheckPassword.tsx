import * as React from "react";

interface CheckPasswordProps {
    password: string;
    onValidityChange: (isValid: boolean) => void;
}

export const CheckPassword: React.FC<CheckPasswordProps> = ({
    password,
    onValidityChange,
    }) => {
    const rules = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    };

    const isValid = Object.values(rules).every(Boolean);

    React.useEffect(() => {
        onValidityChange(isValid);
    }, [isValid, onValidityChange]);

    function renderRule(label: string, valid: boolean) {
        return (
        <li style={{ color: valid ? "green" : "red" }}>
            {valid ? "✔" : "✖"} {label}
        </li>
        );
    }

    return (
        <ul>
        {renderRule("12 caractères minimum", rules.length)}
        {renderRule("Une majuscule", rules.uppercase)}
        {renderRule("Une minuscule", rules.lowercase)}
        {renderRule("Un chiffre", rules.number)}
        {renderRule("Un caractère spécial", rules.special)}
        </ul>
    );
};
