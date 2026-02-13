import bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../../domain/interfaces/UserRepositoryInterface';
import { IOtpBackupCodeRepository } from '../../../domain/interfaces/OtpBackupCodeRepositoryInterface';
import { generateSignature } from '../../../api/utility/password.utility';

export interface VerifyBackupCodeInput {
    userId: string;
    backupCode: string;
}

export interface VerifyBackupCodeOutput {
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    };
    token: string;
    remainingCodes: number;
}

export class VerifyBackupCodeUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly backupCodeRepository: IOtpBackupCodeRepository,
    ) { }

    async execute(input: VerifyBackupCodeInput): Promise<VerifyBackupCodeOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (user.otp_enable !== 1) {
            throw new Error('OTP non activé pour cet utilisateur');
        }
        const backupCodeEntity = await this.backupCodeRepository.findByUserId(input.userId);
        if (!backupCodeEntity) {
            throw new Error('Aucun code de secours trouvé pour cet utilisateur');
        }
        const hashedCodes: string[] = JSON.parse(backupCodeEntity.props.codes);
        let matchedIndex = -1;
        for (let i = 0; i < hashedCodes.length; i++) {
            const isMatch = await bcrypt.compare(input.backupCode.toUpperCase(), hashedCodes[i]);
            if (isMatch) {
                matchedIndex = i;
                break;
            }
        }

        if (matchedIndex === -1) {
            backupCodeEntity.props.nb_consecutive_tests += 1;
            await this.backupCodeRepository.update(backupCodeEntity);

            if (backupCodeEntity.props.nb_consecutive_tests >= 5) {
                throw new Error('Trop de tentatives infructueuses. Veuillez régénérer vos codes de secours.');
            }

            throw new Error('Code de secours invalide');
        }

        hashedCodes.splice(matchedIndex, 1);
        backupCodeEntity.props.codes = JSON.stringify(hashedCodes);
        backupCodeEntity.props.nb_code_used += 1;
        backupCodeEntity.props.nb_consecutive_tests = 0;
        await this.backupCodeRepository.update(backupCodeEntity);

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
            remainingCodes: hashedCodes.length,
        };
    }
}