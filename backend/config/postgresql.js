import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection string from environment
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL or POSTGRES_URL environment variable is required');
  process.exit(1);
}

// Determine if SSL is needed (Railway and most cloud providers use SSL)
const needsSSL = process.env.DATABASE_SSL === 'true' || 
                 DATABASE_URL.includes('ssl=true') || 
                 DATABASE_URL.includes('sslmode=require') ||
                 DATABASE_URL.includes('railway.app') ||
                 process.env.NODE_ENV === 'production';

// Create Sequelize instance
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: needsSSL ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test connection
export const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully');
    
    // Sync models (create tables if they don't exist)
    await sequelize.sync({ alter: false });
    console.log('✅ PostgreSQL models synchronized');
    
    return sequelize;
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error);
    process.exit(1);
  }
};

export default sequelize;

