export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/__tests__/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/old_tests/', '/coverage/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1'
  },
  transform: {},
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: parseInt(process.env.COVERAGE_THRESHOLD_BRANCHES) || 77,
      functions: parseInt(process.env.COVERAGE_THRESHOLD_FUNCTIONS) || 90,
      lines: parseInt(process.env.COVERAGE_THRESHOLD_LINES) || 89,
      statements: parseInt(process.env.COVERAGE_THRESHOLD_STATEMENTS) || 88
    }
  },
  testTimeout: 10000,
  verbose: true
}
