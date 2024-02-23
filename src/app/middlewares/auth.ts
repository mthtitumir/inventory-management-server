import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import { Company } from '../modules/company/company.model';

export interface CustomRequest extends Request {
  user?: JwtPayload & { role: string };
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      // console.log(errror);
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token invalid!');
    }
    
    const { role, email, company } = decoded;
    
    // checking if the user is exist
    const user = await User.isUserExists({ email });
    // checking if company is valid or not
    const companyData = await Company.isCompanyExists(company);
    

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if (!companyData) {
      throw new AppError(httpStatus.NOT_FOUND, 'This company is not found !');
    }
    if(user.company != company){
      throw new AppError(httpStatus.NOT_FOUND, "This user doesn't belong to this company !");
    }
    // checking if the user is already deleted

    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    // }

    // checking if the user is blocked
    // const userStatus = user?.status;

    // if (userStatus === 'blocked') {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    // }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }
    
    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
