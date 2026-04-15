import { verify as otpVerify } from 'otplib';
import { randomBytes } from 'crypto';
import { UserRepositoryInterface } from '../../../domain/interfaces/user-repository.interface';
import { IOtpBackupCodeRepository } from '../../../domain/interfaces/otp-backup-code-repository.interface';
import { OtpBackupCode } from '../../../domain/entities/OtpBackupCode';
import bcrypt from 'bcrypt';

export interface EnableOtpInput {
    userId: string;
    otpToken: string;
}

export interface EnableOtpOutput {
    success: boolean;
    backupCodes: string[];
}

export class EnableOtpOptionUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly backupCodeRepository: IOtpBackupCodeRepository,
    ) { }

    async execute(input: EnableOtpInput): Promise<EnableOtpOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (!user.otp_secret) {
            throw new Error('Secret OTP non généré pour cet utilisateur');
        }
        const result = await otpVerify({
            token: input.otpToken,
            secret: user.otp_secret,
            epochTolerance: 30
        });
        if (!result.valid) {
            throw new Error('Otp Invalide');
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