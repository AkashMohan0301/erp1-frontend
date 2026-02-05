// src/features/auth/auth.types.ts

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expires: string;
};

export interface AuthContextResponse {
  userId: number;
  username: string;
  companyId: number;
  unitId: number;
}

export interface UserUnit {
  unitId: number;
  unitName: string;
}
