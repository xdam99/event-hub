import { generateSecret, generateURI } from 'otplib';
import * as QRCode from 'qrcode';
import { UserRepositoryInterface } from '../../../domain/interfaces/UserRepositoryInterface';

export interface GenerateOtpSecretInput {
    userId: string;
}
export interface GenerateOtpSecretOutput {
    qrCodeDataUrl: string;
    manualKey: string;
}

export class GenerateOtpSecretUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: GenerateOtpSecretInput): Promise<GenerateOtpSecretOutput> {
        const user = await this.userRepository.findById(input.userId);
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }
        const secret = generateSecret();
        await this.userRepository.updateOtpFields(input.userId, secret, user.otp_enable);
        const otpAuthUrl = generateURI({
            issuer: 'EventHub',
            label: user.email,
            secret,
        });
        const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);
        return {
            qrCodeDataUrl,
            manualKey: secret,
        };
    }
}
