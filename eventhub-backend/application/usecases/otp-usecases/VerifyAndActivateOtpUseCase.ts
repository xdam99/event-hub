import { verify as otpVerify } from 'otplib';
import { randomBytes } from 'crypto';
import { UserRepositoryInterface } from '../../../domain/interfaces/UserRepositoryInterface';
import { IOtpBackupCodeRepository } from '../../../domain/interfaces/OtpBackupCodeRepositoryInterface';
import { OtpBackupCode } from '../../../domain/entities/OtpBackupCode';
import bcrypt from 'bcrypt';

export interface VerifyAndActivateOtpInput {
    userId: string;
    otpToken: string;
}

export interface VerifyAndActivateOtpOutput {
    success: boolean;
    backupCodes: string[];
}

export class VerifyAndActivateOtpUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly backupCodeRepository: IOtpBackupCodeRepository,
    ) { }

    async execute(input: VerifyAndActivateOtpInput): Promise<VerifyAndActivateOtpOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (!user.otp_secret) {
            throw new Error('Secret OTP non généré pour cet utilisateur');
        }
        const isValid = await otpVerify({
            token: input.otpToken,
            secret: user.otp_secret,
        });
        if (!isValid) {
            throw new Error('Token OTP invalide');
        }

        await this.userRepository.updateOtpFields(input.userId, user.otp_secret, 1);
        const backupCodes: string[] = [];
        for (let i = 0; i < 10; i++) {
            const code = randomBytes(4).toString('hex').toUpperCase();
            backupCodes.push(code);
        }

        const hashedCodes = await Promise.all(
            backupCodes.map((code) => bcrypt.hash(code, 10))
        );

        await this.backupCodeRepository.deleteByUserId(input.userId);

        const backupCodeEntity = new OtpBackupCode({
            id: 0,
            user_id: input.userId,
            codes: JSON.stringify(hashedCodes),
            nb_code_used: 0,
            nb_consecutive_tests: 0,
        });
        backupCodeEntity.validateOrThrow();
        await this.backupCodeRepository.save(backupCodeEntity);

        return {
            success: true,
            backupCodes,
        };
    }
}