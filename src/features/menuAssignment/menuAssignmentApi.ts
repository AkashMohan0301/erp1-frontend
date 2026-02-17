import { api } from "@/lib/api";
import type {
  MenuAssignmentResponse,
  SaveMenuAssignmentRequest,
} from "./menuAssignmentTypes";

export const menuAssignmentApi = {
  load: async (
    userId: number,
    unitId: number,
    moduleIds: string[]
  ): Promise<MenuAssignmentResponse> => {
    const res = await api.get("/security/menu-assignment", {
      params: {
        userId,
        unitId,
        moduleIds: moduleIds.join(","),
      },
    });

    return res.data.data;
  },

  save: async (
    userId: number,
    payload: SaveMenuAssignmentRequest
  ) => {
    const res = await api.post(
      `/security/menu-assignment/${userId}`,
      payload
    );

    return res.data.data;
  },
};
