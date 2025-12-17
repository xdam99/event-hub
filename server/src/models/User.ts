export type UserRole = "participant" | "organizer" | "admin";

export class User {
    constructor(
        public id: number | null,
        public name: string,
        public email: string,
        public role: UserRole,
        public password: string,
        public created_at?: string
    ) {}
}

