const { Client } = require('pg');
const Helper = require('./helper');
var jwt = require('jsonwebtoken');
var connectionString = "postgres://pavya:pavya@localhost:5432/pavya";

const client = new Client({
    connectionString: connectionString
});

client.connect();

exports.save = function (req, res) {

    const hashPassword = Helper.hashPassword(req.body.password);
console.log("PAssword", hashPassword);
    let employee = [
         req.body.ename,
       req.body.email,
         req.body.contact,
         hashPassword,
         req.body.department,
];
    client.query('INSERT INTO employee(ename, email, contact, password, department) VALUES($1, $2, $3, $4, $5) RETURNING *', employee, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.send('Success');
    });

};

 exports.employee_login = async (req, res) => {

    const text = 'SELECT * FROM employee WHERE email = $1';
    try {
        console.log('Reach');
      const { rows } = await client.query(text, [req.body.email]);
      console.log('ROw',rows);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
    const uname = req.body.email;
    console.log('Email=======',uname);
      console.log('Password=',rows[0].password);
    var token = jwt.sign({ uname: uname }, 'config');
    console.log(token)
       res.status(200).send(token);
    } catch(error) {
      return res.status(400).send(error)
    }
}


