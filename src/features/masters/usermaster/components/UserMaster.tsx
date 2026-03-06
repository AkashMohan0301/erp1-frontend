"use client";

import { useState } from "react";
import { ReusableForm } from "@/components/reusableForm/ReusableForm";

import { userSchema } from "@/features/masters/usermaster/userSchema";
import { userFormFields } from "@/features/masters/usermaster/userFormFields";
import { UserFormValues } from "@/features/masters/usermaster/userSchema";

import { useSaveUser, useUser } from "@/features/masters/usermaster/userHooks";
import { usePrivilegeSetup } from "@/features/masters/usermaster/privilegeHooks";

import { CompanyPrivilegeTab } from "@/features/masters/usermaster/components/CompanyPrivilegeTab";
import { DashboardPrivilegeTab } from "@/features/masters/usermaster/components/DashboardPrivilegeTab";
import { PrivilegeTree } from "./PrivilegeTree";

export default function UserMasterPage() {
  const saveMutation = useSaveUser();
  const { data: privilegeData } = usePrivilegeSetup();

  const [selectedUserId, setSelectedUserId] = useState<number>();

  const { data: editData } = useUser(selectedUserId);

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

  const handleSubmit = async (values: UserFormValues) => {
    await saveMutation.mutateAsync(values);
  };

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
              employeeId: editData.user.employeeId ?? undefined,
              remarks: editData.user.remarks ?? "",
              password: "",
              confirmPassword: "",
              companyPrivileges: editData.companyPrivileges ?? [],
            }
          : undefined
      }
    >
      {(tab, values, setValues) => {
        if (!privilegeData) return null;

        const companies = values.companyPrivileges ?? [];

        switch (tab) {
          case "Companies":
            return (
              <CompanyPrivilegeTab
                companies={privilegeData.companies}
                selected={companies}
                onChange={(updated) =>
                  setValues({
                    ...values,
                    companyPrivileges: updated,
                  })
                }
              />
            );

          case "Privileges":
            if (companies.length === 0)
              return <div>Select companies first.</div>;

            return (
              <div className="space-y-6">
                {companies.map((company) => {
                  // ✅ find company name
                  const companyInfo = privilegeData.companies.find(
                    (c: any) => c.companyId === company.companyId,
                  );

                  return (
                    <div
                      key={company.companyId}
                      
                    >
                      {/* Company Header */}
                      <div className="text-lg font-semibold mb-3 border-b-2  pb-2">
                        {companyInfo?.companyName}
                      </div>

                      <PrivilegeTree
                        company={company}
                        modules={privilegeData.modules}
                        menus={privilegeData.menus}
                        buttons={privilegeData.buttons}
                        onChange={(updatedCompany) => {
                          const updatedCompanies = companies.map((c) =>
                            c.companyId === updatedCompany.companyId
                              ? updatedCompany
                              : c,
                          );

                          setValues({
                            ...values,
                            companyPrivileges: updatedCompanies,
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );

          case "Dashboards":
            return (
              <div className="space-y-6">
                {companies.map((company) => (
                  <DashboardPrivilegeTab
                    key={company.companyId}
                    dashboards={privilegeData.dashboards}
                    selected={company.dashboardPrivileges}
                    onChange={(updated) => {
                      const updatedCompanies = companies.map((c) =>
                        c.companyId === company.companyId
                          ? { ...c, dashboardPrivileges: updated }
                          : c,
                      );

                      setValues({
                        ...values,
                        companyPrivileges: updatedCompanies,
                      });
                    }}
                  />
                ))}
              </div>
            );
        }
      }}
    </ReusableForm>
  );
}
