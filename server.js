const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const appointmentsRouter = require('./src/routes/appointments');
const sequelize = require('./db/database'); // Import the Sequelize instance
const { Appointments } = require('./src/models/appointments'); // Import your models
const userRouter = require('./src/routes/users'); // Import the user routes

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(cors());

// Serve static files from the "static" directory
app.use(express.static(path.join(__dirname, 'static')));

// Route to serve index.html at "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// Use the appointments router
app.use('/api', appointmentsRouter);
app.use('/api', userRouter); // Ensure this line is present
// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.');
});

// Sync the database and start the server
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables (useful for development)
    .then(() => {
        console.log('Database and tables created!');
        app.listen(3000, () => {
            console.log(`Listening on Port 3000`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });