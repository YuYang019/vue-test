module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    collectCoverageFrom: [
        '**/views/*.{js,jsx,vue}',
        '**/components/*.{js,jsx,vue}',
        '**/store/modules/**',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
};
