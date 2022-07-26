export default {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'jsdom',
  verbose: true,
  globals: {
    NODE_ENV: 'test',
  },
};
