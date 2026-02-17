// src/features/auth/authQueryKeys.ts

export const queryKeys = {
  bootstrap: (unitId: number | null) =>
    ["auth-bootstrap", unitId] as const,

  csrf: ["csrf"] as const,
};
