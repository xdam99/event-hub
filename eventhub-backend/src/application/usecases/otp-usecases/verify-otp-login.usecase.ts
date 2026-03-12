import { verify as otpVerify } from 'otplib';
import { UserRepositoryInterface } from '../../../domain/interfaces/user-repository.interface';
import { generateSignature } from '../../../api/utility/password.utility';

export interface VerifyOtpLoginInput {
    userId: string;
    otpToken: string;
}

export interface VerifyOtpLoginOutput {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    token: string;
}

export class VerifyOtpLoginUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: VerifyOtpLoginInput): Promise<VerifyOtpLoginOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (!user.otp_secret || user.otp_enable !== 1) {
            throw new Error('OTP n\'est pas activé pour cet utilisateur ou le secret OTP n\'est pas généré. Veuillez activer OTP et générer un secret avant de vérifier le code OTP.');
        }
        

        const result = await otpVerify({
            token: input.otpToken,
            secret: user.otp_secret,
            epochTolerance: 30
        });

        if (!result.valid) {
            throw new Error('Code OTP invalide. Veuillez réessayer.');
        }
        console.log("coucou")
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
