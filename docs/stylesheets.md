# Stylesheet Code

## Why Sass?

[Sass](https://sass-lang.com) was chosen over some other options because it extends the capabilities of CSS without deviating too far from the direction of the language, making it very easy to pick up for designers and developers who come a vanilla CSS background. It is also extremely easy to setup with [Create React App](https://create-react-app.dev), which is a popular toolchain to use with eswiss since React is the supported JavaScript library.

While CSS-in-JS solutions are being looked into for potential future support, at the moment eswiss does not support them officially. There is certainly nothing stopping you from setting it up on your own though, as most CSS-in-JS solutions should still allow you to follow eswiss stylesheet code guidelines.

## Stylesheet Code Guidelines

### Division of Responsibility: Style, Layout, and Animation

Stylesheet code is divided into three different categories:

| Responsibility | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| **Style**      | The aesthetic features of UI, such as background, color, typography, etc.                      |
| **Layout**     | The spacing and positioning of UI, such as margin, padding, transform, grid, flex, float, etc. |
| **Animation**  | The animation and transition of UI, such as fade, movement, etc.                               |

The distinction between each category is important to understand as a particular code's responsibility will influence the way you write and organize it.

Styles and layouts might have some overlap in responsibility as you may want to add default layout-related features to style code. It is recommended that you keep layout properties in style code to a minimum, and also understand that layout properties in layout code should always take precedence over and layout properties defined in style code.

### Regular Paradigm for Layout & Animation, Utility-First Paradigm for Style

When working with style code, the utility-first paradigm is prioritized. When working with layout or animation, the regular paradigm is prioritized. This will mean that most of your style code will reside within your JSX as values for `className` attributes. Your layout and animation code will then reside exclusively in your Sass files.

### Inline Style Paradigm Use

Use of the inline style paradigm is allowed but should be used sparingly as it does not take advantage of Sass and does not work easily with responsive design. Use of the utility-first paradigm or regular paradigm should always be prioritized first.

_Note: In this case, inline style is referring to the use of the `style` attribute on an HTML tag, not the eswiss style responsibility._

### Separate Style from DOM Hierarchy

Never use default styles to determine what type of HTML tag to use. Let the decision be driven by DOM hierarchy instead.

For example, let's say you want to make a first, primary heading title for a page. You determine that the default font size for the `h1` tag is too large, so you use an `h2` tag instead because its default font size coincidentally is what you want. This is considered bad practice because the main heading title text for a page should be an `h1` tag to make the DOM hierarchy sensible. Keeping a sensible DOM hiearchy should always be prioritized first as it improves accessibility and inclusivity for users with disabilities and comprehensibility for search engine spiders.

To solve default style issue, simply override the default font size with style code.

### Importing Stylesheet Code

eswiss recommends that you use load Sass stylesheets within a central Sass stylesheet, and then import a main stylesheet as an entry to your whole visual codebase in your script code.

When loading Sass stylesheets within other Sass stylesheets, the `@use` rule is preferred over the `@import` rule as it is [recommended by the Sass website](https://sass-lang.com/documentation/at-rules/use).

### CSS Custom Properties vs. Sass Variables

CSS custom properties (which are also known as CSS variables or cascading variables) and Sass variables seemingly offer similar functionality, but when following eswiss guidelines they have different purposes.

Sass variables should be used for unchanging values, similar to how `const` is used for primitive values in script code. CSS custom properties should be used for changing values, similar to how `let` is used in script code.

It should be noted that because Sass variables are preprocessed, they cannot be directly read or updated with script code. Importing Sass variables from external Sass files also creates a dependency for the build process. That is why in cases where you need to update a Sass variable value with script code, a CSS custom property should be used instead.

One caveat with CSS custom properties is that you can lose track where they are declared or how they cascade when there are a lot of them in a complex stylesheet structure. That is why in cases where custom property values do not change, Sass variables should be used instead.

### Formatting

eswiss recommends using [stylelint](https://stylelint.io) with [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) and [stylelint-order](https://github.com/hudochenkov/stylelint-order).
