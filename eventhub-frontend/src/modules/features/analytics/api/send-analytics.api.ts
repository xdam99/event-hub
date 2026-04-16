import type { AnalyticsModel } from "../model/analytics.model";
import type { IAnalyticsGateway } from "./interfaces/analytics-gateway.interface";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export class SendAnalyticsApi implements IAnalyticsGateway {
    async sendAnalytics(event: AnalyticsModel.Event): Promise<void> {
        await axios.post(`${API_BASE}/analytics`, event);
    }
}