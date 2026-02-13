import { UserRepositoryInterface } from '../../../domain/interfaces/UserRepositoryInterface';
import { IOtpBackupCodeRepository } from '../../../domain/interfaces/OtpBackupCodeRepositoryInterface';

export interface DisableOtpInput {
    userId: string;
}

export interface DisableOtpOutput {
    success: boolean;
}

export class DisableOtpUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly backupCodeRepository: IOtpBackupCodeRepository,
    ) { }
    async execute(input: DisableOtpInput): Promise<DisableOtpOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        if (user.otp_enable !== 1) {
            throw new Error('OTP n\'est pas activé pour cet utilisateur');
        }
        await this.userRepository.updateOtpFields(input.userId, null, 0);
        // SUPPRIME LES CODES DE SAUVEGARDE LIÉS À L'UTILISATEUR
        await this.backupCodeRepository.deleteByUserId(input.userId);

        return { success: true };
    }
}
