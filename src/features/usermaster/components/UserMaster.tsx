"use client";

import { useState } from "react";
import { ReusableForm } from "@/components/reusableForm/ReusableForm";

import { userSchema } from "@/features/usermaster/userSchema";
import { userFormFields } from "@/features/usermaster/userFormFields";
import type { UserFormValues } from "@/features/usermaster/userFormFields";

import { useSaveUser, useUser } from "@/features/usermaster/userHooks";
import { usePrivilegeSetup } from "@/features/usermaster/privilegeHooks";

import { CompanyPrivilegeTab } from "@/features/usermaster/components/CompanyPrivilegeTab";
import { ModulePrivilegeTab } from "@/features/usermaster/components/ModulePrivilegeTab";
import { MenuPrivilegeTab } from "@/features/usermaster/components/MenuPrivilegeTab";
import { ButtonPrivilegeTab } from "@/features/usermaster/components/ButtonPrivilegeTab";
import { DashboardPrivilegeTab } from "@/features/usermaster/components/DashboardPrivilegeTab";

import type {
  UserModulePrivilege,
  UserMenuPrivilege,
  UserButtonPrivilege,
  UserDashboardPrivilege,
  UserCompanyPrivilege,
} from "@/features/usermaster/userTypes";

export default function UserMasterPage() {
  const saveMutation = useSaveUser();
  const { data: privilegeData } = usePrivilegeSetup();

  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const { data: editData } = useUser(selectedUserId);

  // =========================
  // Initial Form Values
  // =========================
  const initialValues: UserFormValues = {
    userId: undefined,
    loginId: "",
    userName: "",
    companyId: 0,
    userType: "O",
    employeeId: undefined,
    remarks: "",
    status: "A",
    password: "",
    confirmPassword: "",
    companyPrivileges: [],
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async (values: UserFormValues) => {
    await saveMutation.mutateAsync(values);
  };

  // =========================
  // Render
  // =========================
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
      externalData={
        editData
          ? {
              ...editData.user,
              companyPrivileges: editData.companyPrivileges ?? [],
            }
          : undefined
      }
    >
      {(tab, values, setValues) => {
        if (!privilegeData) return null;

        const companyPrivileges = values.companyPrivileges ?? [];

        const updateCompanyPrivileges = (updated: UserCompanyPrivilege[]) => {
          setValues({
            ...values,
            companyPrivileges: updated,
          });
        };

        switch (tab) {
          // =========================
          // COMPANIES
          // =========================
          case "Companies":
            return (
              <CompanyPrivilegeTab
                companies={privilegeData.companies ?? []}
                selected={companyPrivileges}
                onChange={updateCompanyPrivileges}
              />
            );

          // =========================
          // MODULES
          // =========================
          case "Modules":
            if (companyPrivileges.length === 0)
              return <div>Select companies first.</div>;

            return (
              <div className="space-y-6">
                {companyPrivileges.map((company) => {
                  const companyInfo = privilegeData.companies.find(
                    (c: any) => c.companyId === company.companyId,
                  );

                  return (
                    <div
                      key={company.companyId}
                      className="border p-4 rounded-md bg-blue-50 dark:bg-gray-700"
                    >
                      <div className="font-semibold mb-3">
                        {companyInfo?.companyName}
                      </div>

                      <ModulePrivilegeTab
                        modules={privilegeData.modules}
                        selected={company.modulePrivileges}
                        onChange={(updated: UserModulePrivilege[]) => {
                          updateCompanyPrivileges(
                            companyPrivileges.map((c) =>
                              c.companyId === company.companyId
                                ? { ...c, modulePrivileges: updated }
                                : c,
                            ),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );

          // =========================
          // MENUS
          // =========================
          case "Menus":
            if (companyPrivileges.length === 0)
              return <div>Select companies first.</div>;

            return (
              <div className="space-y-6">
                {companyPrivileges.map((company) => {
                  const companyInfo = privilegeData.companies.find(
                    (c: any) => c.companyId === company.companyId,
                  );

                  return (
                    <div
                      key={company.companyId}
                      className="border p-4 rounded-md bg-blue-50 dark:bg-gray-700"
                    >
                      <div className="font-semibold mb-3">
                        {companyInfo?.companyName}
                      </div>

                      <MenuPrivilegeTab
                        menus={privilegeData.menus}
                        selectedModules={company.modulePrivileges}
                        selectedMenus={company.menuPrivileges}
                        onChange={(updated: UserMenuPrivilege[]) => {
                          updateCompanyPrivileges(
                            companyPrivileges.map((c) =>
                              c.companyId === company.companyId
                                ? { ...c, menuPrivileges: updated }
                                : c,
                            ),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );

          // =========================
          // BUTTONS
          // =========================
          case "Buttons":
            if (companyPrivileges.length === 0)
              return <div>Select companies first.</div>;

            return (
              <div className="space-y-6">
                {companyPrivileges.map((company) => {
                  const companyInfo = privilegeData.companies.find(
                    (c: any) => c.companyId === company.companyId,
                  );

                  return (
                    <div
                      key={company.companyId}
                      className="border p-4 rounded-md bg-blue-50 dark:bg-gray-700"
                    >
                      <div className="font-semibold mb-3">
                        {companyInfo?.companyName}
                      </div>

                      <ButtonPrivilegeTab
                        buttons={privilegeData.buttons}
                        menus={privilegeData.menus}
                        selectedMenus={company.menuPrivileges}
                        selectedButtons={company.buttonPrivileges}
                        onChange={(updated: UserButtonPrivilege[]) => {
                          updateCompanyPrivileges(
                            companyPrivileges.map((c) =>
                              c.companyId === company.companyId
                                ? { ...c, buttonPrivileges: updated }
                                : c,
                            ),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );

          // =========================
          // DASHBOARDS
          // =========================
          case "Dashboards":
            if (companyPrivileges.length === 0)
              return <div>Select companies first.</div>;

            return (
              <div className="space-y-6">
                {companyPrivileges.map((company) => {
                  const companyInfo = privilegeData.companies.find(
                    (c: any) => c.companyId === company.companyId,
                  );

                  return (
                    <div
                      key={company.companyId}
                      className="border p-4 rounded-md dark:bg-gray-700"
                    >
                      <div className="font-semibold mb-3">
                        {companyInfo?.companyName}
                      </div>

                      <DashboardPrivilegeTab
                        dashboards={privilegeData.dashboards}
                        selected={company.dashboardPrivileges}
                        onChange={(updated: UserDashboardPrivilege[]) => {
                          updateCompanyPrivileges(
                            companyPrivileges.map((c) =>
                              c.companyId === company.companyId
                                ? { ...c, dashboardPrivileges: updated }
                                : c,
                            ),
                          );
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );

          default:
            return null;
        }
      }}
    </ReusableForm>
  );
}
