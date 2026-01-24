// src/types/api.ts

export interface ApiResponse<T> {
  correlationId: string;
  code: string;
  message: string;
  data: T;
}

export interface ApiError {
  correlationId: string;
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
