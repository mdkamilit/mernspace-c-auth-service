/** @type {import("jest").Config} **/
module.exports = {
   testEnvironment: 'node',
   verbose: true,
   transform: {
      '^.+\\.tsx?$': ['ts-jest', {}],
   },
};
