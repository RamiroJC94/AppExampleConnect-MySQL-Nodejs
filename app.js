const express = require('express');
const mysql = require('mysql');

//	create connection  
const db = mysql.createConnection({
	host 		: 	'localhost',
	user 		: 	'root',
	password 	: 	'42167895'/*,
	database 	: 	'nodemysql'*/
});

// connect
db.connect((err) =>{
	if(err){
		throw err;
	}
	console.log('MySql Connected...');
});

const app = express();

// create DB
app.get('/createdb/:name', (req, res)=>{
	let sql = `CREATE DATABASE ${req.params.name}`;
	db.query(sql,(err, result) =>{
		if(err)throw err;
		console.log(result);
		res.send('Database created...')
	});
});

//	create table
app.get('/usedatabases/:DB', (req, res)=>{
	let sql = `USE ${req.params.DB}`;
	db.query(sql,(err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('USE DB '+req.params.DB+'...');
	});
});

//	create table
app.get('/createpoststable/:name', (req, res)=>{
	let sql = `CREATE TABLE ${req.params.name}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))`;
	db.query(sql,(err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('posts table created...');
	});
});

// Insert post 1
//
//	INSERT INTO posts SET ? { title: 'Post One', body: 'This is post number one' }
//
app.get('/addpost/:name', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = `INSERT INTO ${req.params.name} SET ?`;
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
    console.log(sql, post);
});

// Insert post 1 : ('/addpost','posts',{title:'post One', body:'this is post number one'})
//
//	INSERT INTO posts SET ? { title: 'Post One', body: 'this is post number one' }
//
//	localhost:3000/addpost/posts/{ title: 'Post One', body: 'this is post number one' }
app.get('/addpost/:table/:post', (req, res) => {
	let sql = `INSERT INTO ${req.params.table} SET ?`;
	let query = db.query(sql, req.params.post, (err, result) =>{
		if(err) throw err;
		console.log(result);
		res.send('Insert in '+table+'...');
	});
	console.log(sql, post);
});

// Select
function SelectFrom(url,table){
	app.get(url, (req, res) => {
		let sql = 'SELECT * FROM '+table;
		let query = db.query(sql, (err, result) =>{
			if(err) throw err;
			console.log(result);
			res.send('Post fethed '+table+'...');
		});
	});
}

SelectFrom('/getpost','posts');


app.listen('3000' , () =>{
	console.log('Server started on port 3000');
});