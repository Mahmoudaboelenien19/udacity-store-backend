import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
      if (decode) {
        next();
      } else {
        res.status(401).send('expired token');
      }
    } else {
      res.status(401).send('expired token');
    }
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

export default authorization;
