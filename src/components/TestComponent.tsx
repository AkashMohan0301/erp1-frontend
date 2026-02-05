"use client";

import { useAppDispatch } from "@/store/hooks";
import { setActiveUnit } from "@/store/authContextSlice";

export default function TestUnitSwitch() {
  const dispatch = useAppDispatch();

  return (
    <button className="w-max bg-red-300"
      onClick={() => dispatch(setActiveUnit({ unitId: 2 }))}
    >
      Switch to Unit 2
    </button>
  );
}
