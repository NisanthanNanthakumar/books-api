const app = require('./src/app');
const port = process.env.PORT || 3000;

var server = app.listen(port, () => {
  console.log(`Server listening on port ${port} ...`)

  console.log(`
Try it (in another terminal window):
$ curl http://127.0.0.1:${port}/books/1503214133

See README.md for instructions.
`)

});

module.exports = server;
