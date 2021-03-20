# Express Telegram Bot on Node.js

Rapid prototyping of telegram bot with Node.js. Small code footprint.

Made for local development

## Ready out of the box:

- Bot Listening
- Bot Responding
- User Reply Keyboard template
- Progressive response collection
- Save received data to JSON

## Guide

Before everything you need to create your own bot via @Botfather to get your BOT TOKEN.

Copy `.env.example` to `.env`, and fill out the TELEGRAM_TOKEN in `.env` file.

1. Clone the project
2. Install node modules: `npm install`
3. Run the local development: `npm dev`

Once deployed to production, you need to access your URL+TELEGRAM_TOKEN to activate bot to work on Webhook mode.
Example: `www.yourboturl.com/telegram-token-acquired-from-botfather`

### Help and Support

Create [a new issue](https://github.com/danieltorscho/node-telegram/issues/new) ticket if required.