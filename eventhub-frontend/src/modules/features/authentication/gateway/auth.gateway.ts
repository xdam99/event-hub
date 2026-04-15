import axios from "axios";

export interface IAuthGateway {
    login(email: string, password: string): Promise<any>;
    register(payload: any): Promise<any>;
    verifyOtpLogin(tempToken: string, otpToken: string): Promise<any>;
    verifyBackupCode(tempToken: string, backupCode: string): Promise<any>;
}

const API_BASE = 'http://localhost:3000/api';

export class AuthGateway implements IAuthGateway {
    async login(email: string, password: string) {
        const response = await axios.post(`${API_BASE}/users/login`, { email, password }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async register(payload: any) {
        const response = await axios.post(`${API_BASE}/users/register`, payload, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyOtpLogin(tempToken: string, otpToken: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-login`, { tempToken, otpToken }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyBackupCode(tempToken: string, backupCode: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-backup`, { tempToken, backupCode }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async logout() {
        await axios.post(`${API_BASE}/users/logout`, {}, {
            withCredentials: true
        });
    }
}