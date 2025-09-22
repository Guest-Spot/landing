declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }

  const gtag: (command: string, action: string, parameters?: Record<string, unknown>) => void;
}
