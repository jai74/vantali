// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());



app.post('/join-waitlist', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Add email to SQLite database
  db.run("INSERT INTO waitlist (email) VALUES (?)", [email], (err) => {
    if (err) {
      console.error('Error adding email to SQLite database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(`Email added to SQLite database: ${email}`);
    return res.json({ success: true });
  });
});

app.get('/waitlist', (req, res) => {
  // Retrieve the waitlist from the SQLite database
  db.all("SELECT id, email FROM waitlist", (err, rows) => {
    if (err) {
      console.error('Error retrieving waitlist from SQLite database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({ waitlist: rows });
  });
});

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
