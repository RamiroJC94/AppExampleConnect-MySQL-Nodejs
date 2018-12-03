const http = require('http');

http.createServer(function(req,res){
// request 	=== req
// response === res
	res.write('<h1>Hola Mundo desde nodejs</h1>')
	res.end();
}).listen(3000);