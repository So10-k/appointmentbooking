const sequelize = require('./database');
const User = require('../src/models/user');

(async () => {
    try {
        await sequelize.sync({ force: false }); // Ensure tables exist
        const employee = await User.findOne({ where: { username: 'employee' } });
        if (!employee) {
            await User.create({
                username: 'employee',
                email: 'employee@example.com',
                password: 'employee',
                role: 'employee',
            });
            console.log('Employee account created.');
        } else {
            console.log('Employee account already exists.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit();
    }
})();