// import { useMenus } from "@/features/menu/menu.hooks";
// import { useAppSelector } from "@/store/hooks";
// import { selectAuthContext } from "@/store/authContextSlice";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export function useRoutePermission(menuCode: string) {
//   const router = useRouter();
//   const { unitId } = useAppSelector(selectAuthContext);
//   const { data: menus, isLoading } = useMenus(unitId);

//   useEffect(() => {
//     if (isLoading || !menus) return;

//     const hasAccess = hasMenu(menus, menuCode);

//     if (!hasAccess) {
//       router.replace("/403");
//     }
//   }, [menus, isLoading, menuCode]);
// }

// function hasMenu(menus: any[], menuCode: string): boolean {
//   for (const m of menus) {
//     if (m.menuCode === menuCode) return true;
//     if (m.children?.length && hasMenu(m.children, menuCode)) return true;
//   }
//   return false;
// }
