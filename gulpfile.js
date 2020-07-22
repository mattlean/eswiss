const del = require('del')
const { dest, series, src } = require('gulp')
const {
  init: sourceMapsInit,
  write: sourceMapsWrite,
} = require('gulp-sourcemaps')
const { createProject } = require('gulp-typescript')

const tsProject = createProject('tsconfig.json', {
  declaration: true,
  isolatedModules: false,
  jsx: 'react',
  module: 'amd',
  noEmit: false,
  resolveJsonModule: false,
  sourceMap: true,
})

const clean = () => del(['dist/**/*'])

const compileTS = () =>
  src([
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.test.ts',
    '!src/setupTests.ts',
  ])
    .pipe(sourceMapsInit())
    .pipe(tsProject())
    .pipe(sourceMapsWrite())
    .pipe(dest('dist'))

const copyStyles = () =>
  src(['src/**/*.css', 'src/**/*.scss']).pipe(dest('dist'))

exports.default = series(clean, compileTS, copyStyles)
