import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/usecases';
import { UserRepositoryDatabase } from '../../infrastructure/repositories/user-repository';
import { UserPayload } from '../../domain/entities/User';

const userRepository = new UserRepositoryDatabase();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const result = await registerUserUseCase.execute({
            username,
            email,
            password,
        });
        if(result.token) {
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3600 * 24 * 7 * 1000
            });
        }
        const { token, ...userData } = result;
        res.status(201).jsonSuccess(userData);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await loginUserUseCase.execute({
            email,
            password,
        });
        if(result.token) {
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 3600 * 24 * 7 * 1000
            });
        }
        const { token, ...userData } = result;
        res.status(201).jsonSuccess(userData);
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as Request & { user?: UserPayload }).user;
        if (!user) {
            return res.status(401).jsonError('N\'est pas autorisé');
        }
        const fullUser = await userRepository.findById(user.id);
        if (!fullUser) {
            return res.status(404).jsonError('Utilisateur non trouvé');
        }
        res.jsonSuccess({
            id: fullUser.id,
            username: fullUser.username,
            email: fullUser.email,
            otp_enable: fullUser.otp_enable,
            createdAt: fullUser.createdAt,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.status(200).jsonSuccess({ message: 'Déconnexion réussie' });
    } catch (error) {
        next(error);
    }
}