import {create} from 'zustand';

export const useRecordsStore = create<any>(set => ({
  data: [],
  setNewData: (newData: any[]) => set({data: newData}),
}));
