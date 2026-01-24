export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    expires: string;
  };
  message: string;
  correlationId: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  correlationId: string;
  errors?: string[];
};

//Testing comment