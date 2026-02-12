//path : src/features/company/companyQueryKeys.ts
export const companyQueryKeys = {
  all: ["company"] as const,

  byId: (id: number) =>
    [...companyQueryKeys.all, "byId", id] as const,
};
