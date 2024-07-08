module.exports = {
    reset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['vue', 'js', 'ts', 'json']
};