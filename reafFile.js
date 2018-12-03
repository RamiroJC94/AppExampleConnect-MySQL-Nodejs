const fs ¡ require('fs');

fs.readFile('./texto.txt', function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data.toString());
	}
});