// server/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  //setupFilesAfterEnv: ['<rootDir>/../tests/setup.ts'],
  clearMocks: true,
  // verbose: true,
};

export default config;
