// src/features/auth/auth.types.ts

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expires: string;
};
