export const userQueryKeys = {
  all: ["usermaster"] as const,

  lists: () => [...userQueryKeys.all, "list"] as const,

  detail: (id: number) =>
    [...userQueryKeys.all, "detail", id] as const,
};