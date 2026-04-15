import axios from "axios";
import type { UserProfile } from "../store/user.slice";

export interface IUserGateway {
    getProfile(): Promise<UserProfile>;
    generateOtpSecret(): Promise<any>;
    verifyAndActivateOtp(otpToken: string): Promise<any>;
    disableOtp(): Promise<any>;
}

const API_BASE = 'http://localhost:3000/api';

export class UserGateway implements IUserGateway {
    async getProfile(): Promise<UserProfile> {
        const response = await axios.get(`${API_BASE}/users/profile`, {
            withCredentials: true
        });
        return response.data.data;
    }

    async generateOtpSecret() {
        const response = await axios.post(`${API_BASE}/otp/generate`, {}, {
            withCredentials: true
        });
        return response.data.data;
    }

    async verifyAndActivateOtp(otpToken: string) {
        const response = await axios.post(`${API_BASE}/otp/verify-activation`, { otpToken }, {
            withCredentials: true
        });
        return response.data.data;
    }

    async disableOtp() {
        const response = await axios.post(`${API_BASE}/otp/disable`, {}, {
            withCredentials: true
        });
        return response.data.data;
    }
}