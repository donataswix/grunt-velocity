/*
 * grunt-velocity
 * https://github.com/stephenwil/grunt-velocity
 *
 * Copyright (c) 2015 Stephen Wilson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    velocity: {
      default_options: {
        options: {
          data: 'test/fixtures/test-data.json'
        },
        files: {
          'tmp/default_options/': ['test/fixtures/**/*.vm']
        }
      },
      expand_support: {
        options: {
          data: 'test/fixtures/test-data.json'
        },
        files: [{
          expand: true,
          src: 'test/fixtures/**/*.vm',
          dest: 'tmp/expand_support/',
          ext: '.html'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'velocity', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
