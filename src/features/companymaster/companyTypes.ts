// path: src/features/company/companyTypes.ts
export interface CompanyDto {
  companyId?: number;
  companyName: string;
  address: string;
  city: string;
  stateCode: string;
  countryCode: string;
  customerShortName: string;
  contactNo?: string;
  emailId?: string;
  status: string;
  pin:string;
}
