import { type Dependencies } from "../store/dependencies";
import { createStore, type AppStore } from "../store/store";
import { AuthGateway } from "../features/authentication/gateway/auth.gateway";
import { UserGateway } from "../features/user/gateway/user.gateway";
import { SendAnalyticsApi } from "../features/analytics/api/send-analytics.api";
import { FetchAnalyticsDataApi } from "../features/dashboard/api/fetch-analytics-data.api";
import { EventGateway } from "../features/events/api/fetch-events.api";

export class App {
    public dependencies: Dependencies;
    public store: AppStore;

    constructor() {
        this.dependencies = this.setupDependencies();
        this.store = createStore({ dependencies: this.dependencies });
    }

    setupDependencies(): Dependencies {
        return {
            authGateway: new AuthGateway(),
            userGateway: new UserGateway(),
            eventGateway: new EventGateway(),
            analyticsGateway: new SendAnalyticsApi(),
            dashboardQuery: new FetchAnalyticsDataApi(),
        };
    }
}


export const app = new App();