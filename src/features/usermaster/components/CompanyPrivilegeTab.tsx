"use client";

import { Checkbox } from "@/components/ui/checkbox";
import type { UserCompanyPrivilege } from "../userTypes";

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
  const toggleCompany = (company: any) => {
    const exists = selected.find(
      c => c.companyId === company.companyId
    );

    if (exists) {
      onChange(
        selected.filter(c => c.companyId !== company.companyId)
      );
    } else {
      onChange([
        ...selected,
        {
          companyId: company.companyId,
          modulePrivileges: [],
          menuPrivileges: [],
          buttonPrivileges: [],
          dashboardPrivileges: [],
        },
      ]);
    }
  };

  return (
    <div className="space-y-2">
      {companies.map(company => (
        <div
          key={company.companyId}
          className="flex items-center gap-2"
        >
          <Checkbox
            checked={!!selected.find(
              c => c.companyId === company.companyId
            )}
            onCheckedChange={() => toggleCompany(company)}
          />
          <span>{company.companyName}</span>
        </div>
      ))}
    </div>
  );
}