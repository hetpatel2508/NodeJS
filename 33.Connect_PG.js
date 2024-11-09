//There are 2 ways to connect to postgresSQL database using node js

/*
    1. using Clint 
    2. using Pool
*/

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'client_db',
    password: 'het$1234',
    port: 5432,
});

        //or

const client = new Client({
    connectionString: "postgres://postgres:het$1234@localhost:5432/client_db",
})


client.connect();

client.query('SELECT * FROM teachers', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(res.rows);
    }
});

client.end();







const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'password',
    port: 5432,
});
pool.connect();

pool.query('SELECT * FROM teachers', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        console.log(res.rows);
        //It will be like
        /*
            [
                { id: 1, name: 'Het', age: 22 },
                { id: 2, name: 'Deep', age: 23 },
                { id: 3, name: 'Urvish', age: 22 }
            ]
        */
    }
});