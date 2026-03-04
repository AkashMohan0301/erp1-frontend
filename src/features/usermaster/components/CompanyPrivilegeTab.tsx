"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { UserCompanyPrivilege } from "../userTypes";

import { useAppSelector } from "@/store/hooks";
import { selectFormMode } from "@/store/authContextSlice";

interface Props {
  companies: {
    companyId: number;
    companyName: string;
  }[];

  selected: UserCompanyPrivilege[];

  onChange: (updated: UserCompanyPrivilege[]) => void;
}

export function CompanyPrivilegeTab({
  companies,
  selected,
  onChange,
}: Props) {

  const mode = useAppSelector(selectFormMode);
  const isView = mode === "VIEW";

  const toggleCompany = (companyId: number) => {

    if (isView) return;

    const exists = selected.some(
      c => c.companyId === companyId
    );

    let updated: UserCompanyPrivilege[];

    if (exists) {

      updated = selected.filter(
        c => c.companyId !== companyId
      );

    } else {

      updated = [
        ...selected,
        {
          companyId,
          modulePrivileges: [],
          menuPrivileges: [],
          buttonPrivileges: [],
          dashboardPrivileges: [],
        },
      ];

    }

    onChange(updated);
  };

  return (

    <div
      className={
        isView
          ? "space-y-2 pointer-events-none opacity-70"
          : "space-y-2"
      }
    >

      {companies.map(company => {

        const checked = selected.some(
          c => c.companyId === company.companyId
        );

        return (

          <div
            key={company.companyId}
            className="flex items-center gap-2"
          >

            <Checkbox
              checked={checked}
              onCheckedChange={() =>
                toggleCompany(company.companyId)
              }
            />

            {company.companyName}

          </div>

        );

      })}

    </div>

  );
}