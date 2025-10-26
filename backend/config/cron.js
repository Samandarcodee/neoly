import cron from 'node-cron';
import axios from 'axios';
import Habit from '../models/Habit.js';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://your-miniapp-url.com';

// Run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Running daily reminder job...');
    
    const habits = await Habit.find({ completed: false });
    
    for (const habit of habits) {
      const today = new Date();
      const lastCheckIn = habit.lastCheckIn;
      
      // Check if user hasn't checked in today
      let needsReminder = true;
      
      if (lastCheckIn) {
        const lastCheckInDate = new Date(lastCheckIn);
        const isSameDay = today.getDate() === lastCheckInDate.getDate() &&
                         today.getMonth() === lastCheckInDate.getMonth() &&
                         today.getFullYear() === lastCheckInDate.getFullYear();
        
        if (isSameDay) {
          needsReminder = false;
        }
      }

      if (needsReminder) {
        const message = `🗓️ HabitFlow Reminder\n\n` +
                       `📌 ${habit.title}\n` +
                       `📊 Progress: ${habit.currentDay}/${habit.duration} days\n` +
                       `⏰ ${habit.duration - habit.currentDay} days remaining\n\n` +
                       `Did you complete your habit today?`;

        const keyboard = {
          inline_keyboard: [[
            {
              text: '✅ Open HabitFlow',
              web_app: { url: WEBAPP_URL }
            }
          ]]
        };

        try {
          await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
              chat_id: habit.userId,
              text: message,
              reply_markup: keyboard
            }
          );
          console.log(`Sent reminder to user ${habit.userId} for habit ${habit.title}`);
        } catch (error) {
          console.error(`Failed to send reminder to user ${habit.userId}:`, error.message);
        }
      }
    }
    
    console.log('Daily reminder job completed');
  } catch (error) {
    console.error('Error in daily reminder job:', error);
  }
}, {
  timezone: 'UTC'
});

console.log('Cron job scheduled for daily reminders at 9 AM UTC');

