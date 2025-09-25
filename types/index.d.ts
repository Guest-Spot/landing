interface Day {
  date: string;
}

type Week = Day[];

// Google Analytics types
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
