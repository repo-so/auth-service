// client/jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.(spec|test).ts'],
  //setupFilesAfterEnv: ['<rootDir>/../tests/setup.ts'],
  clearMocks: true,
  
};

export default config;
