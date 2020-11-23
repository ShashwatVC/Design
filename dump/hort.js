const http = require('http');
const routes = require('./routes');

const server =    http.createServer(routes); //when multiple items are exported from a module they are accessed by (moduleName.functionName) to be kept in mind
      
        



server.listen(4000);