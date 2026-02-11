import { useQuery } from "@tanstack/react-query";

export function useDynamicOptions(
  endpoint: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch options");
      return res.json();
    },
    enabled,
  });
}
