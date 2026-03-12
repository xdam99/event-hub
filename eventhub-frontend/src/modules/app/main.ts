import { type Dependencies } from "../store/dependencies";
import { createStore, type AppStore } from "../store/store";
import { AuthGateway } from "../features/authentication/gateway/auth.gateway";
import { UserGateway } from "../features/user/gateway/user.gateway";
import { EventGateway } from "../features/events/gateway/event.gateway";

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
        };
    }
}


export const app = new App();