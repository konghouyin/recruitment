var express = require('express');
var static = require('express-static');

var server = express();
server.use(static('./dist'));

server.listen(8858);