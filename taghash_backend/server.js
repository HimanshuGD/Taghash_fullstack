const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
    user: 'himanshu',
    host: 'localhost',
    database: 'taghash',
    password: '',
    port: 5432,
});
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/vote', async (req, res) => {
    const { name, voting_choice, casted_at } = req.body;
    try {
        const client = await pool.connect();

        const [day, month, year] = casted_at.split('-');
        const casted_date = new Date(`${year}-${month}-${day}`);

        const result = await client.query('INSERT INTO votes (name, voting_choice, casted_at) VALUES ($1, $2, $3) RETURNING id', [name, voting_choice, casted_date]);
        const id = result.rows[0].id;

        client.release();
        res.json({ id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/data', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM votes');
        client.release();
        
        const format_Data = result.rows.map(row => {
            const casted_date = new Date(row.casted_at);
            const day = casted_date.getDate();
            const month = casted_date.getMonth() + 1;
            const year = casted_date.getFullYear();
            const format_Date = `${day}-${month}-${year}`;

            return {
                id: row.id,
                name: row.name,
                voting_choice: row.voting_choice,
                casted_at: format_Date
            };
        });

        res.json({ data: format_Data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/counts', async (req, res) => {
    const { voting_choice } = req.query;
    try {
        const client = await pool.connect();
        const dateResult = await client.query('SELECT DISTINCT casted_at::date as casted_date FROM votes WHERE voting_choice = $1', [voting_choice]);
        const distinctDates = dateResult.rows.map((row) => row.casted_date);

        const countResult1 = await client.query(`
            SELECT casted_at::date as casted_date, 
            SUM(CASE WHEN voting_choice = true THEN 1 ELSE 0 END) as count 
            FROM votes 
            WHERE voting_choice = $1 
            GROUP BY casted_date
        `, [voting_choice]);

        const countResult0 = await client.query(`
            SELECT casted_at::date as casted_date, 
            SUM(CASE WHEN voting_choice = false THEN 1 ELSE 0 END) as count 
            FROM votes 
            WHERE voting_choice = $1 
            GROUP BY casted_date
        `, [voting_choice]);

        client.release();

        const dateToCount = {};
        countResult1.rows.forEach((row) => {
            dateToCount[row.casted_date] = row.count;
        });

        const response = {
            data: distinctDates.map((date) => ({
                count: dateToCount[date] || 0,
                casted_at: date.toISOString().split('T')[0],
                
            })),
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/results', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT voting_choice, COUNT(*) as count FROM votes GROUP BY voting_choice');
        client.release();
        res.json({ data: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
