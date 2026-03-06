export const companyQueryKeys = {
  all: ["company"] as const,

  lists: () => [...companyQueryKeys.all, "list"] as const,

  detail: (id: number) =>
    [...companyQueryKeys.all, "detail", id] as const,
};