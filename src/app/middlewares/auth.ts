import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email, /*iat*/ } = decoded;
    // checking if the user exists
    const userData = await User.isUserExists({email});

    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }
    // checking if already user deleted
    // if (userData?.isDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    // }
    // // // checking if already user Blocked
    // if (userData?.status === 'blocked') {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    // }

    // if (
    //   userData.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     userData.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'Token invalid!');
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    req.user = decoded;
    next();
  });
};

export default auth;
