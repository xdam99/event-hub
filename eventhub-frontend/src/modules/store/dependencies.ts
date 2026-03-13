import type { SendAnalyticsApi } from '../features/analytics/api/send-analytics.api';
import type { AuthGateway } from '../features/authentication/gateway/auth.gateway';
import type { FetchAnalyticsDataApi } from '../features/dashboard/api/fetch-analytics-data.api';
import type { EventGateway } from '../features/events/gateway/event.gateway';
import type { UserGateway } from '../features/user/gateway/user.gateway';

export type Dependencies = {
    authGateway: AuthGateway;
    userGateway: UserGateway;
    eventGateway: EventGateway;
    analyticsGateway: SendAnalyticsApi;
    dashboardQuery: FetchAnalyticsDataApi;
};