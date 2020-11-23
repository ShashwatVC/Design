const fs = require('fs');

const requestHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;
    if(url==='/') {
        res.setHeader('content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Enter the message</title></head>');
    res.write('<body><form action = "/message" method="POST"><input type ="text" name="messages"><button type = "submit">WHatisit</button></form></body>');
    res.write('</html>');
    return res.end();
    
    }
    if (url === '/message' && method === 'POST') {
        body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[0];
            fs.writeFile('message.txt', message, err =>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
                
            });
           
        });
       
    }
    res.setHeader('content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Firrst Page</title></head>');
    res.write('<body><h1>Hello node.js Server taking responses!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;
/*
a way to export multiple items 
module.exports = {
    handeler : requestHandler,
    someText : 'hard coced'
};

another way:
module.exports = requestHandler;
module.exports = someText;

also 
 exports.handler = requestHandler;
 ... and so on
 

*/