"use client";

import { useEffect, useState } from "react";
import { ReusableForm } from "@/components/reusableForm/ReusableForm";

import { userSchema } from "@/features/usermaster/userSchema";
import { userFormFields } from "@/features/usermaster/userFormFields";
import type { UserFormValues } from "@/features/usermaster/userFormFields";

import { useSaveUser } from "@/features/usermaster/userHooks";
import { usePrivilegeSetup } from "@/features/usermaster/privilegeHooks";
import { useUser } from "@/features/usermaster/userHooks";

import { ModulePrivilegeTab } from "@/features/usermaster/components/ModulePrivilegeTab";
import { MenuPrivilegeTab } from "@/features/usermaster/components/MenuPrivilegeTab";
import { ButtonPrivilegeTab } from "@/features/usermaster/components/uttonPrivilegeTab";
import { DashboardPrivilegeTab } from "@/features/usermaster/components/DashboardPrivilegeTab";

import type {
  UserModulePrivilege,
  UserMenuPrivilege,
  UserButtonPrivilege,
  UserDashboardPrivilege,
  UserSavePayload,
} from "@/features/usermaster/userTypes";

export default function UserMasterPage() {
  const saveMutation = useSaveUser();
  const { data: privilegeData } = usePrivilegeSetup();

  // ===========================
  // Privilege State
  // ===========================
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [modulePrivileges, setModulePrivileges] = useState<
    UserModulePrivilege[]
  >([]);
  const [menuPrivileges, setMenuPrivileges] = useState<UserMenuPrivilege[]>([]);
  const [buttonPrivileges, setButtonPrivileges] = useState<
    UserButtonPrivilege[]
  >([]);
  const [dashboardPrivileges, setDashboardPrivileges] = useState<
    UserDashboardPrivilege[]
  >([]);
  const { data: editData } = useUser(selectedUserId);
  // ===========================
  // Initial Values
  // ===========================

  useEffect(() => {
    if (!editData) return;

    setModulePrivileges(editData.modulePrivileges);
    setMenuPrivileges(editData.menuPrivileges);
    setButtonPrivileges(editData.buttonPrivileges);
    setDashboardPrivileges(editData.dashboardPrivileges);
  }, [editData]);

  const initialValues: UserFormValues = {
    userId: undefined,
    loginId: "",
    userName: "",
    companyId: 1, // default company
    userType: "O",
    employeeId: undefined,
    remarks: "",
    status: "A",
    password: "",
  };

  // ===========================
  // Submit Handler
  // ===========================

  const handleSubmit = async (values: UserFormValues) => {
    const payload: UserSavePayload = {
      ...values,
      modulePrivileges,
      menuPrivileges,
      buttonPrivileges,
      dashboardPrivileges,
    };

    await saveMutation.mutateAsync(payload);
  };

  // ===========================
  // Render
  // ===========================

  return (
    <ReusableForm
      heading="User Master"
      fields={userFormFields}
      schema={userSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      mode="ADD"
      onValueChange={(field, value) => {
        if (field === "userId") {
          setSelectedUserId(value);
        }
      }}
      externalData={editData?.user}
    >
      {(tab) => {
        if (!privilegeData) return null;

        switch (tab) {
          case "Modules":
            return (
              <ModulePrivilegeTab
                modules={privilegeData.modules}
                selected={modulePrivileges}
                onChange={setModulePrivileges}
              />
            );

          case "Menus":
            return (
              <MenuPrivilegeTab
                menus={privilegeData.menus}
                selectedModules={modulePrivileges}
                selectedMenus={menuPrivileges}
                onChange={setMenuPrivileges}
              />
            );

          case "Buttons":
            return (
              <ButtonPrivilegeTab
                buttons={privilegeData.buttons}
                selectedMenus={menuPrivileges}
                selectedButtons={buttonPrivileges}
                onChange={setButtonPrivileges}
              />
            );

          case "Dashboards":
            return (
              <DashboardPrivilegeTab
                dashboards={privilegeData.dashboards}
                selected={dashboardPrivileges}
                onChange={setDashboardPrivileges}
              />
            );

          default:
            return null;
        }
      }}
    </ReusableForm>
  );
}
