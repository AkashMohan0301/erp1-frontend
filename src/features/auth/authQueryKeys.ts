// src/features/auth/authQueryKeys.ts

export const queryKeys = {
  bootstrap: () =>
    ["auth-bootstrap"] as const,

  csrf: ["csrf"] as const,
};
