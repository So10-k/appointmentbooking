const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Route for account creation
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User created successfully', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// Route for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Redirect based on role
        if (user.role === 'employee') {
            res.redirect(`/employee.html?userid=${user.id}`);
        } else {
            res.redirect(`/index.html?bookerid=${user.id}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;