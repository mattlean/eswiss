# Stylesheet Code

## Why Sass?

[Sass](https://sass-lang.com) was chosen because it extends the capabilities of CSS without deviating too far from the direction of the language, making it very easy to pick up for designers and developers who come a vanilla CSS background. It is also extremely easy to setup with [Create React App](https://create-react-app.dev), which is a popular toolchain to use with eswiss since React is the supported JavaScript library.

While CSS-in-JS solutions are being looked into, at the moment eswiss does not support them officially. There is certainly nothing stopping you from setting it up on your own though, as most CSS-in-JS solutions should still allow you to follow eswiss stylesheet code guidelines.

## Stylesheet Code Guidelines

### Division of Responsibility: Style, Layout, and Animation

Stylesheet code is divided into three different categories:

| Responsibility | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| **Appearance** | The aesthetic features of UI, such as background, color, typography, etc.                      |
| **Layout**     | The spacing and positioning of UI, such as margin, padding, transform, grid, flex, float, etc. |
| **Animation**  | The animation and transition of UI, such as fade, movement, etc.                               |

The distinction between each category is important to understand as a particular code's responsibility will influence the way you write and organize it.

Appearance and layouts might have some overlap in responsibility as you may want to add default layout-related features to appearance code. It is recommended that you keep layout properties in appearance code to a minimum, and also understand that layout properties in layout code should always take precedence over and layout properties defined in appearance code.

### Regular Paradigm for Layout & Animation, Utility-First Paradigm for Style

When working with layout or animation code, the regular paradigm is utilized. When working with appearance code, the utility-first paradigm is prioritized. This will mean that most of your layout and animation code will reside exclusively in your Sass files. Your appearance code will reside mostly within your JSX as values for `className` attributes, but will occassionally exist in Sass files for the less common cases where the utility-first paradigm is not appropriate.

// TODO: Why two different paradigms?

### Regular Paradigm Formatting

When writing stylesheet code in the regular paradigm, you are to separate your properties into sections in this order:

1. Custom Properties
2. Appearance
3. Layout
4. Animation

Each section is separated by at least one newline. Within each section, properties are ordered alphabetically.

To enforce this formatting, eswiss recommends using [stylelint](https://stylelint.io) with [stylelint-order](https://github.com/hudochenkov/stylelint-order).

// TODO: Include stylelint config

### Class Naming Convention

It is important to write class names that make sense. Reading a class name should easily give a general idea on what it could do or at least what it's used for.

Use of dashes to separate words is preferred over camelCasing.

When writing class names to be used exclusively by a particular component, the class names should be prefixed by the component name.

### Inline Style Paradigm Use

Use of the inline style paradigm is allowed but should be used sparingly as it does not take advantage of Sass and does not work easily with responsive design. Use of the utility-first paradigm or regular paradigm should always be prioritized first.

### Importing Stylesheet Code

eswiss recommends that you use load Sass stylesheets within a central Sass stylesheet, and then import a main stylesheet as an entry to your whole visual codebase in your script code.

When loading Sass stylesheets within other Sass stylesheets, the `@use` rule is preferred over the `@import` rule as it is [recommended by the Sass website](https://sass-lang.com/documentation/at-rules/use).

### CSS Custom Properties vs. Sass Variables

CSS custom properties (also known as CSS variables or cascading variables) and Sass variables seemingly offer similar functionality, but when following eswiss guidelines they have different purposes.

The decision is determined by whether or not the value can be changed during runtime. Sass variables should be used for unchanging values, similar to how `const` is used for primitive values in script code. CSS custom properties should be used for changing values, similar to how `let` is used in script code.

It should be noted that because Sass variables are preprocessed, they cannot be directly read or updated with script code. Importing Sass variables from external Sass files also creates a dependency for the build process. That is why in cases where you need to update a Sass variable value with script code, a CSS custom property should be used instead.

One caveat with CSS custom properties is that you can lose track where they are declared or how they cascade when there are a lot of them in a complex stylesheet structure. That is why in cases where custom property values do not change, Sass variables should be used instead.

### Separate Appearance from DOM Hierarchy

Never use default appearance to determine what type of HTML tag to use. Let the decision be driven by DOM hierarchy instead.

For example, let's say you want to make a first, primary heading title for a page. You determine that the default font size for the `h1` tag is too large, so you use an `h2` tag instead because its default font size coincidentally is what you want. This is considered bad practice because the main heading title text for a page should be an `h1` tag to make the DOM hierarchy sensible. Keeping a sensible DOM hiearchy should always be prioritized first as it improves accessibility and inclusivity for users with disabilities and comprehensibility for search engine spiders.

To solve default appearance issue, simply override the default font size with appearance code.
