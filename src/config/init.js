const { connectDB } = require('./database');
const { seedDatabase } = require('./seed');

const initializeDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Run migrations
    const { execSync } = require('child_process');
    execSync('npm run migrate', { stdio: 'inherit' });

    // Seed database
    await seedDatabase();

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

module.exports = { initializeDatabase }; 