export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
}

export interface LoginInputs{
    email: string,
    password: string
}
