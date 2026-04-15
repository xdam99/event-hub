import { UserPayload } from './src/domain/entities/User';

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
