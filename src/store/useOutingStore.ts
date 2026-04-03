import { create } from "zustand";

export type OutingStatus = "out" | "returned" | "overdue";

export interface Outing {
  id: string;
  studentId: string;
  studentName: string;
  exitTime: number; // timestamp
  returnTime: number | null;
  status: OutingStatus;
}

interface OutingState {
  outings: Outing[];
  startOuting: (studentId: string, studentName: string) => void;
  returnOuting: (id: string) => void;
  checkOverdue: () => void;
  // Test helpers:
  fastForward: (id: string, hours: number) => void;
}

export const useOutingStore = create<OutingState>((set, get) => ({
  outings: [
    {
      id: `OUT-DEMO`,
      studentId: "STUDENT-1234",
      studentName: "Alex Sharma",
      exitTime: Date.now() - (1000 * 60 * 30), // 30 mins ago
      returnTime: null,
      status: "out"
    }
  ],
  
  startOuting: (studentId, studentName) => {
    // Only allow one active outing per student for this prototype
    const hasActive = get().outings.some(o => o.studentId === studentId && (o.status === "out" || o.status === "overdue"));
    if (hasActive) return;

    const newOuting: Outing = {
      id: `OUT-${Math.floor(Math.random() * 10000)}`,
      studentId,
      studentName,
      exitTime: Date.now(),
      returnTime: null,
      status: "out"
    };

    set((state) => ({ outings: [newOuting, ...state.outings] }));
  },

  returnOuting: (id) => {
    set((state) => ({
      outings: state.outings.map((o) =>
        o.id === id ? { ...o, returnTime: Date.now(), status: "returned" } : o
      ),
    }));
  },

  checkOverdue: () => {
    const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
    const now = Date.now();
    let changed = false;

    const updatedOutings = get().outings.map((o) => {
      if (o.status === "out" && now - o.exitTime > SIX_HOURS_MS) {
        changed = true;
        return { ...o, status: "overdue" as OutingStatus };
      }
      return o;
    });

    if (changed) {
      set({ outings: updatedOutings });
    }
  },

  fastForward: (id, hours) => {
    set((state) => ({
      outings: state.outings.map((o) =>
        o.id === id ? { ...o, exitTime: o.exitTime - hours * 60 * 60 * 1000 } : o
      ),
    }));
  }
}));

// Setup a global interval to check overdue status every 1 minute
if (typeof window !== 'undefined') {
  setInterval(() => {
    useOutingStore.getState().checkOverdue();
  }, 60 * 1000);
}
