'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.velocity = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/default_options/testing');
    var expected = grunt.file.read('test/expected/default_options.1');
    test.equal(actual, expected, 'Velocity template is not as expected.');

    var actual2 = grunt.file.read('tmp/default_options/testing2');
    var expected2 = grunt.file.read('test/expected/default_options.2');
    test.equal(actual2, expected2, 'Velocity template is not as expected.');

    test.done();
  },
  expand_support: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/expand_support/test/fixtures/testing.html');
    var expected = grunt.file.read('test/expected/default_options.1');
    test.equal(actual, expected, 'Velocity template is not as expected.');

    var actual2 = grunt.file.read('tmp/expand_support/test/fixtures/testing2.html');
    var expected2 = grunt.file.read('test/expected/default_options.2');
    test.equal(actual2, expected2, 'Velocity template is not as expected.');

    test.done();
  }
};
