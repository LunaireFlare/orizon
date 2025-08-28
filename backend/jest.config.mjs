// const config = {
//   preset: 'ts-jest/presets/default-esm',
//   testEnvironment: 'node',

//   extensionsToTreatAsEsm: ['.ts'],

//   transform: {
//     '^.+\\.ts$': ['ts-jest', {
//       useESM: true,
//       tsconfig: './tsconfig.json',
//     }],
//   },

//   roots: ['<rootDir>/tests'],
//   testMatch: ['**/*.test.ts'], 

//   moduleNameMapper: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },

//   transform: {
//     '^.+\\.ts$': ['ts-jest', { useESM: true }],
//   },

//   transformIgnorePatterns: ['node_modules'],

//   moduleFileExtensions: ['ts', 'js', 'json', 'node'],
// };

// export default config;


// const config = {
//   preset: 'ts-jest/presets/default-esm',
//   testEnvironment: 'node',

//   extensionsToTreatAsEsm: ['.ts'],

//   transform: {
//     '^.+\\.ts$': ['ts-jest', {
//       useESM: true,
//       tsconfig: './tsconfig.json',
//     }],
//   },

//   roots: ['<rootDir>/tests'],
//   testMatch: ['**/*.test.js'], 

//   moduleNameMapper: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },

//   transform: {
//     '^.+\\.ts$': ['ts-jest', { useESM: true }],
//   },

//   transformIgnorePatterns: ['node_modules'],

//   moduleFileExtensions: ['ts', 'js', 'json', 'node'],
// };

// export default config;

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: './tsconfig.json',
    }],
  },

  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.js'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.ts$': '$1',
  },

  transformIgnorePatterns: ['node_modules'],

  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
