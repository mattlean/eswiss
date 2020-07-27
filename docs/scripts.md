# Scripts

For eswiss, **script code** is defined as any JavaScript or TypeScript related code.

## Why React?

[React](https://reactjs.org) was chosen because of its component-based development methodology and maturity as a library. It is very well maintained and has a thriving ecosystem around it. On top of that, it's extremely easy to setup with [Create React App](https://create-react-app.dev).

While other JavaScript libraries and are being looked into for potential future support, at the moment only React is officially supported.

## Why only JavaScript or TypeScript?

JavaScript was chosen because it is the primary programming language for developing browser-based projects. [TypeScript](https://typescriptlang.org) was chosen because it builds on JavaScript by adding static type definitions, is very well maintained, and has a very active community around it.

## JavaScript vs. TypeScript

eswiss supports both JavaScript and TypeScript, so choosing a language really just comes down to preference. The compiled script code found in the project's `dist` directory is ES5 JavaScript, and every `*.js` has a counterpart `*.d.ts` file. The pre-compilation TypeScript source files are also available in the `src` directory.
