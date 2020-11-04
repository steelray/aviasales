export interface IUser {
  email: string;
  username: string;
}

export interface IUserAuthData {
  accessToken: string;
  accessTokenExpiresAt: number;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  tokenType: string;
  userId: number;
}
