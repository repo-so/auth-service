module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', 
  testMatch: [
    '**/client/**/*.test.ts',
    '**/server/**/*.test.ts',
    '**/tests/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>/client', '<rootDir>/server', '<rootDir>/tests'],
};
