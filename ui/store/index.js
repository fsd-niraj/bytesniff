import { create } from 'zustand';

export const useAppStore = create((set, get) => ({
  intercept: false,
  queue: [],
  history: [],
  setIntercept: (v) => set({ intercept: v }),
  addQueueItem: (item) => set({ queue: [...get().queue, item] }),
  removeQueueItem: (id) =>
    set({ queue: get().queue.filter((q) => q.id !== id) }),
  setHistory: (items) => set({ history: items }),
}));
