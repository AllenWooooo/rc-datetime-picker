var fs = require('fs');
var uglify = require('uglify-js');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var replace = require('rollup-plugin-replace');
var version = process.env.VERSION || require('../package.json').version;

// Generate banner for current build
var banner =
  '/*\n' +
  ' * rc-datetime-picker v' + version + '\n' +
  ' * https://github.com/AllenWooooo/rc-datetime-picker\n' +
  ' *\n' +
  ' * (c) ' + new Date().getFullYear() + ' Allen Wu\n' +
  ' * License: MIT\n' +
  ' */';

var babelOptions = {
  babelrc: false,
  presets: [
    ['es2015', {modules: false}],
    'stage-0',
    'react'
  ],
  "plugins": [
    "external-helpers"
  ]
};

function main() {
  buildCJS()
    .then(buildUmdDev)
    .then(buildUmdProd)
    .catch(logError);
}

// CommonJS build, used by webpack, browserify, etc.
function buildCJS() {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      babel(babelOptions)
    ]
  }).then(function (bundle) {
    bundle.generate({
      format: 'cjs',
      banner: banner
    }).then(({ code }) => {
      return write('dist/rc-datetime-picker.cjs.js', code);
    });
  });
}

// Standalone development build
function buildUmdDev() {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      babel(babelOptions)
    ]
  }).then(function (bundle) {
    bundle.generate({
      format: 'umd',
      banner: banner,
      name: 'rc-datetime-picker'
    }).then(({ code }) => {
      return write('dist/rc-datetime-picker.js', code);
    });
  });
}

function buildUmdProd() {
  // Standalone production build
  return rollup.rollup({
    entry: 'src/Picker.jsx',
    plugins: [
      babel(babelOptions)
    ]
  }).then(function (bundle) {
    bundle.generate({
      format: 'umd',
      name: 'rc-datetime-picker'
    }).then(({ code }) => {
      var minified = banner + '\n' + uglify.minify(code, {
        fromString: true,
        compress: true
      }).code;
      return write('dist/rc-datetime-picker.min.js', minified);
    });
  });
}

function write(dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) {
        return reject(err);
      }
      console.log(blue(dest) + ' ' + getSize(code));
      resolve();
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}

main();