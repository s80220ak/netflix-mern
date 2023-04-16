module.exports = {
  verbose: true,
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.jsx?$": ["babel-jest", { configFile: "./babel.config.js" }],
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!swiper)/"],
};

// module.exports = {
//   roots: ["<rootDir>/src"],
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
//   moduleFileExtensions: ["js", "jsx", "json", "node"],
// };

// module.exports = {
//   roots: ["<rootDir>/src"],
//   // testMatch: ["*/__tests__/**/.[jt]s?(x)", "*/?(.)+(spec|test).[jt]s?(x)"],
//   setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
//   transform: {
//     "^.+\\.jsx?$": "babel-jest",
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
//   moduleFileExtensions: ["js", "jsx", "json", "node"],
// };
