const del = require('del')
const { dest, series, src } = require('gulp')
const { createProject } = require('gulp-typescript')
const tsProject = createProject('tsconfig.json')

const clean = () => del(['dist/**/*'])

const compileTS = () =>
  src([
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/*.test.ts',
  ])
    .pipe(tsProject())
    .pipe(dest('dist'))

const copyStyles = () =>
  src(['src/**/*.css', 'src/**/*.scss']).pipe(dest('dist'))

exports.default = series(clean, compileTS, copyStyles)
