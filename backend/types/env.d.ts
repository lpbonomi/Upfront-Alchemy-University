declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALCHEMY_API_KEY: string;
      ETHERSCAN_API_KEY: string;
      PRIVATE_KEY: string;
    }
  }
}

export {};
