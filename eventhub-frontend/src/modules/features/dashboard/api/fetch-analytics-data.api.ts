import axios from "axios";
import * as DashboardModel from "../model/dashboard.model";
import type { IDashboardQuery } from "./interfaces/dashboard-query.interface";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';
export class FetchAnalyticsDataApi implements IDashboardQuery {
    async fetchViewsPerPage(): Promise<DashboardModel.PageViewData[]> {
        const response = await axios.get(`${API_BASE}/analytics`, {
            withCredentials: true
        });

        return response.data.data
    }
}