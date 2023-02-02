declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALCHEMY_API_KEY: string;
      ALCHEMY_NETWORK: string;
      NEXT_PUBLIC_DEFAULT_CHAINs: "goerli" | "mainnet";
    }
  }
}

export {};
