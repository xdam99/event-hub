import { UserRepositoryInterface } from "../../../domain/interfaces/user-repository.interface";
import jwt from "jsonwebtoken";
import { getEnvVariable, generateSignature } from "../../../api/utility/index";

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface LoginUserOutput {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    token: string;
    otpRequired?: boolean;
    tempToken?: string;
}

export class LoginUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        if (!input.email || input.email.trim() === '') {
            throw new Error('L\'email est requis');
        }
        if (!input.password) {
            throw new Error('Le mot de passe est requis');
        }
        const user = await this.userRepository.login(input.email, input.password);
        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        if (user.otp_enable === 1) {
            const SECRET_KEY = getEnvVariable("JWT_SECRET");
            const tempToken = jwt.sign(
                { id: user.id, purpose: 'otp-verification' },
                SECRET_KEY,
                { expiresIn: '5m' }
            );
            return {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token: '',
                otpRequired: true,
                tempToken,
            };
        }

        const token = generateSignature({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            },
            token,
        };
    }
}
