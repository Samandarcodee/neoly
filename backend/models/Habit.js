import { DataTypes } from 'sequelize';
import sequelize from '../config/postgresql.js';

const Habit = sequelize.define('Habit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    index: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentDay: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastCheckIn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  checkInHistory: {
    type: DataTypes.JSONB,
    defaultValue: []
  }
}, {
  tableName: 'habits',
  timestamps: true,
  underscored: false
});

export default Habit;
