const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: 'password',
    port: 5432,
});

client.connect();

const InsertData = async () => {
    try {
        await client.query('INSERT INTO teachers(name, age, gender, salary) VALUES($1, $2, $3, $4)', ['Het', 20, 'Male', 50000]);
        await client.query('INSERT INTO teachers(name, age, gender, salary) VALUES($1, $2, $3, $4)', ['Urvish', 21, 'Male', 60000]);
        await client.query('INSERT INTO teachers(name, age, gender, salary) VALUES($1, $2, $3, $4)', ['Sahil', 20, 'Male', 70000]);
        await client.query('INSERT INTO teachers(name, age, gender, salary) VALUES($1, $2, $3, $4)', ['Hemangi', 19, 'Female', 80000]);
    } catch (err) {
        console.log(err.stack);
    } finally {
        client.end();
    }
}

InsertData();