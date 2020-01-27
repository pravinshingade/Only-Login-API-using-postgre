const express = require('express');
const parser = require('body-parser');
const router = require('./login.route');
const app = express();


const { Client } = require('pg');
const connectionString = 'postgres://pavya:pavya@localhost:5432/pavya';
const client = new Client({
    connectionString: connectionString
});client.connect();



app.use(parser.json());
app.use(parser.urlencoded({ extended: false}))
app.use(parser.json({type: 'application/json'}));
app.use(parser.text());

app.use('/employee', router);
let port = 3001;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

console.log('Pavya');