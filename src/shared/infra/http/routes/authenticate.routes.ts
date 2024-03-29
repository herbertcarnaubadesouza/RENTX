import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';
import { Router } from 'express';


const autheticateRoutes = Router();


const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();


autheticateRoutes.post('/sessions', authenticateUserController.handle);

autheticateRoutes.post('/refresh-token', refreshTokenController.handle);

export { autheticateRoutes }