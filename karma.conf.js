'use strict';

var proxyquire     = require('proxyquireify');
var aliasify       = require('aliasify');
var aliasifyConfig = require('./aliasify.js');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-chrome-launcher',
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'spec/*.js'
    ],

    // list of files to exclude
    exclude: [
      '**/node_modules/**/*Spec.js',
      '**/node_modules/**/*.spec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      bundleDelay: 500,
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle
            .plugin(proxyquire.plugin)
            .transform(aliasify, aliasifyConfig)
          ;
        });
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress', 'html'],
    reporters: ['progress'],

    // the default configuration
    htmlReporter: {
      outputDir: 'build/karma_html',
      templatePath: 'node_modules/karma-html-reporter/jasmine_template.html'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,
    // logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    autoWatchBatchDelay: 2500,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
