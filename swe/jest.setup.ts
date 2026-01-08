import "@testing-library/jest-dom";

// Polyfills for MSW and Next.js 16
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
