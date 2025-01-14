import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../data/mongodb/models/userModel';

export class AuthMiddleware {
  static async validateJwt(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization') || '';
    if (!authorization) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    if (!authorization.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid Bearer token' });
      return;
    }
    const [, token = ''] = authorization.split(' ');

    try {
      const payload = await JwtAdapter.validateToken<{
        id: string;
        _id: string;
      }>(token);
      if (!payload) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      const user =
        payload && (await UserModel.findById(payload.id || payload._id));
      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }
      req.body.client = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
