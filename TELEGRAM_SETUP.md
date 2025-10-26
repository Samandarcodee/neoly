# Telegram Bot Setup Guide

This guide will help you set up your Telegram bot for the HabitFlow Mini App.

## Step 1: Create a Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send the command: `/newbot`
3. Follow the instructions:
   - Enter a name for your bot (e.g., "HabitFlow Bot")
   - Enter a username for your bot (must end with 'bot', e.g., "habitflow_bot")
4. BotFather will give you a **Bot Token**. Save this token!

## Step 2: Create Mini App

1. In the chat with BotFather, send: `/newapp`
2. Select your bot from the list
3. Enter a title for your Mini App (e.g., "HabitFlow")
4. Enter a short description (e.g., "Build habits, track progress daily")
5. Upload a photo (optional but recommended)
6. Add the URL of your deployed frontend (e.g., `https://your-miniapp.vercel.app`)
7. BotFather will create your Mini App and provide you with a short name

## Step 3: Set Bot Commands

1. In BotFather, send: `/setcommands`
2. Select your bot
3. Add these commands:

```
start - Start using HabitFlow
help - Get help and information
```

## Step 4: Set Up Web App Button (Optional)

You can add a persistent button in your bot that opens the Mini App:

1. Send to BotFather: `/setmenubutton`
2. Select your bot
3. Enter the button text (e.g., "Open HabitFlow")
4. Enter your Mini App URL

## Step 5: Test Your Mini App

1. Start a chat with your bot
2. Send `/start`
3. Click the "Open HabitFlow" button or the web app button
4. Your Mini App should open in Telegram!

## Step 6: Configure Backend

Add your bot credentials to `backend/.env`:

```env
BOT_TOKEN=your_bot_token_from_botfather
BOT_USERNAME=your_bot_username
WEBAPP_URL=https://your-deployed-frontend-url.com
```

## Testing Locally

To test locally with ngrok:

1. Install ngrok: https://ngrok.com/download
2. Start your frontend: `cd frontend && npm run dev`
3. In another terminal, run: `ngrok http 5173`
4. Copy the HTTPS URL from ngrok (e.g., `https://abc123.ngrok.io`)
5. Update your Mini App URL in BotFather: `/newapp` → Select your bot → Update the URL
6. Also update `WEBAPP_URL` in `backend/.env` with the ngrok URL

## Important Notes

- The Mini App URL must be HTTPS (not HTTP)
- For production, use a proper domain
- The bot token and other sensitive data should never be committed to git
- Your MongoDB database will store all user habits and progress

## Example Message Handler

Here's a simple example of a message handler (for when the bot is running in a separate Telegram bot service):

```javascript
// This would be in your bot service (not in the Mini App)
import axios from 'axios';

const BOT_TOKEN = process.env.BOT_TOKEN;

// Handle /start command
bot.command('start', async (ctx) => {
  const keyboard = {
    inline_keyboard: [[
      {
        text: '🚀 Open HabitFlow',
        web_app: { url: process.env.WEBAPP_URL }
      }
    ]]
  };

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    'Welcome to HabitFlow! 🎯\n\nBuild lasting habits, one day at a time.',
    {
      reply_markup: keyboard
    }
  );
});
```

## Troubleshooting

### Mini App not opening
- Check that the URL is correct and accessible
- Make sure the URL uses HTTPS
- Verify the bot has the correct permissions

### Bot not responding
- Check if the bot token is correct
- Make sure the bot is not blocked
- Verify network connectivity

### Can't send reminders
- Check that `BOT_TOKEN` is set in backend `.env`
- Verify MongoDB is connected
- Check cron job logs in the backend console

---

For more help, visit: https://core.telegram.org/bots/webapps

