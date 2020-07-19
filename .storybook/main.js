module.exports = {
  stories: [
    '../src/**/*.stories.js',
    '../src/**/*.stories.jsx',
    '../src/**/*.stories.ts',
    '../src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
}
