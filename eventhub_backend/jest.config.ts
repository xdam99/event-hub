import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: ["/node_modules/(?!uuid)/"], // laisse ts-jest transformer uuid
    testRegex: '\\.test\\.ts$',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src',
    coverageDirectory: '../coverage',
    coverageProvider: 'v8',
};

export default config;