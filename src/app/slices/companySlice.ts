import { StateCreator } from 'zustand';

export type CompanySliceType = {
  companies: string[];
  addCompanies: (companies: string[]) => void;
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
};

export const createCompanySlice: StateCreator<CompanySliceType> = (set) => ({
  companies: [],
  addCompanies: (companies: string[]) => set(() => ({ companies })),
  selectedCompany: '',
  setSelectedCompany: (company: string) => set(() => ({ selectedCompany: company })),
});
