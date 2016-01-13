var fs         = require('fs');
var browserify = require('browserify');
var proxyquire = require('proxyquireify');

var aliasifyConfig = require('./aliasify.js');

//main
browserify()
  .transform('aliasify', aliasifyConfig)
  .require(require.resolve('./src/main.js'), { entry: true })
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/build' + '/bundle.js'));

// test
browserify()
  .plugin(proxyquire.plugin)
  .transform('aliasify', aliasifyConfig)
  .require(require.resolve('./spec/main.spec.js'), { entry: true })
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/build' + '/test.js'));
