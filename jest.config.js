module.exports = {
    preset: 'ts-jest', // Підтримка TypeScript
    testEnvironment: 'node', // Тестове середовище для Node.js
    testMatch: ['**/tests/**/*.test.ts'], // Де шукати тести
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.ts$': 'ts-jest', // Використовувати ts-jest для TypeScript
    },
    verbose: true, // Детальний лог тестів
    testTimeout: 30000, // Таймаут для довгих інтеграційних тестів
};
