# Stylesheet Code

For eswiss, **stylesheet code** is defined as any Sass and CSS related code.

Visual code's responsibilities are divided into three different categories:

- Style: The aesthetic features of UI, such as background, color, typography, etc.
- Layout: The spacing and positioning of UI, such as margin, padding, transform, grid, flex, float, etc.
- Animation: The animation and transition of UI, such as fade, movement, etc.

The distinction between each category is important to understand as it does affect the way you write and organize your code in an eswiss project.

## Why Sass?

[Sass](https://sass-lang.com) was chosen over some other options because it extends the capabilities of CSS without deviating too far from the direction of the language, making it very easy to pick up for designers and developers who come a vanilla CSS background. It is also extremely easy to setup with [Create React App](https://create-react-app.dev), which is a popular toolchain to use with eswiss since React is the supported JavaScript library.

While CSS-in-JS solutions are being looked into for potential future support, at the moment eswiss does not support them officially. There is certainly nothing stopping you from setting it up on your own though, as most CSS-in-JS solutions should still allow you to follow eswiss stylesheet code guidelines.

## Stylesheet Code Writing Guidelines

## Importing Stylesheet Code

eswiss recommends that you use load Sass stylesheets within a central Sass stylesheet, and then import a main stylesheet as an entry to your whole visual codebase in your script code.

When loading Sass stylesheets within other Sass stylesheets, the `@use` rule is preferred over the `@import` rule as it is [recommended by Sass website](https://sass-lang.com/documentation/at-rules/use).

### Separation of Concerns: Style, Layout, and Animation

### Separating DOM Hierarchy from Visual Hierarchy

### Utility Class for Style

### CSS Custom Properties vs. Sass Variables

### Let the linter drive your code formatting

eswiss recommends using [stylelint](https://stylelint.io) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-order](https://github.com/hudochenkov/stylelint-order).
