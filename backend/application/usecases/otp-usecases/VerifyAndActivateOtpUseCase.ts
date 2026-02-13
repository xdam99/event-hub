import { verify as otpVerify } from 'otplib';
import { randomBytes } from 'crypto';
import { UserRepositoryInterface } from '../../../domain/interfaces/UserRepositoryInterface';
import { IOtpBackupCodeRepository } from '../../../domain/interfaces/OtpBackupCodeRepositoryInterface';
import { OtpBackupCode } from '../../../domain/entities/OtpBackupCode';

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
            throw new Error('User not found');
        }
        if (!user.otp_secret) {
            throw new Error('OTP secret not generated. Please generate a secret first.');
        }
        const isValid = await otpVerify({
            token: input.otpToken,
            secret: user.otp_secret,
        });
        if (!isValid) {
            throw new Error('Invalid OTP code');
        }

        await this.userRepository.updateOtpFields(input.userId, user.otp_secret, 1);

        // génrération des codes de sauvegarde
        const backupCodes: string[] = [];
        for (let i = 0; i < 10; i++) {
            const code = randomBytes(4).toString('hex').toUpperCase();
            backupCodes.push(code);
        }

        await this.backupCodeRepository.deleteByUserId(input.userId);

        const backupCodeEntity = new OtpBackupCode({
            id: 0,
            user_id: input.userId,
            codes: JSON.stringify(backupCodes),
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
