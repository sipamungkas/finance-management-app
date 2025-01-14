import {create} from 'zustand';

export const useRecordsStore = create<any>(set => ({
  data: [],
  monthlyIncome: 0,
  monthlyExpense: 0,
  setNewData: (newData: any[]) => set({data: newData}),
  setMonthlyIncome: (newData: number) => set({monthlyIncome: newData}),
  setMonthlyExpense: (newData: number) => set({monthlyExpense: newData}),
}));
