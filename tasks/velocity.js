/*
 * grunt-velocity
 * https://github.com/stephenwil/grunt-velocity
 *
 * Copyright (c) 2015 Stephen Wilson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var _ = require('underscore');
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('velocity', 'Grunt plugin to run velocity templates through a velocity engine in an un-opinionated way', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options(),
    Engine = require('velocity').Engine,
      count = 0;

    var data = options.data;
    delete options.data;

    if (typeof data === "string" && !grunt.file.exists(data)) {
      grunt.log.warn('Data file"' + data + '" not found.');
      return false;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      f.src.forEach(function(file) {
        grunt.log.ok('Processing ' + file);

        if (!grunt.file.exists(file)) {
          grunt.log.warn('Source file "' + file + '" not found.');
          return false;
        }

        parseVelocity(file, f.dest, Engine, data, options);
        count++;
      });

      grunt.log.ok('Parsed ' + count + ' file(s)');
    });

    function parseVelocity(srcFile, dest, Engine, dataFile, options) {
      var data;
      // read the data file
      if (typeof dataFile === "string") {
        data = grunt.file.readJSON(dataFile, {encoding: 'utf8'});
      } else {
        // data object passed in
        data = dataFile;
      }

      // read the src file
      var src = grunt.file.read(srcFile);

      var engine = new Engine(_.extend(options, {
        template: src
      }));
      var output = engine.render(data);

      // Write the destination file.
      grunt.file.write(dest, output);
    }
  });

};
