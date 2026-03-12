import { IAnalyticsRepository } from "../../domain/interfaces/analytics-repository.interface";

export class GetAnalyticsQuery {
    constructor(private readonly analyticsRepository: IAnalyticsRepository){}

    async execute() {
        return this.analyticsRepository.getAnalytics();
    }
}