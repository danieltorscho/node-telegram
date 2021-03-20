require('dotenv').config();
const Vue = require('vue');
const Vuex = require('vuex');
const { save } = require('./database');
const TelegramBot = require('node-telegram-bot-api');
Vue.use(Vuex);
const store = require('./store');

let bot;

// Set correct serving mode
autosetBotServeMode();

console.log(`🆗 Bot started in the ${process.env.NODE_ENV} mode`);

// Listen for incoming chat message from user
bot.on('message', async (msg) => {
  store.commit('MESSAGE', msg);
  
  // Reset question if /start command received
  if (replyIs('/start')) {
    store.commit('QUESTION', '');
  };

  switch (store.state.question) {
    default:
      ask('What is your first name ?', 'FIRSTNAME');
    break;

    case 'FIRSTNAME':
      store.commit('ADD_FIELD', { firstname: msg.text });
      ask('What is your last name ?', 'LASTNAME');
    break;

    case 'LASTNAME':
      store.commit('ADD_FIELD', { lastname: msg.text });
      ask('How old are you ?', 'AGERANGE', {
        parse_mode: 'Markdown',
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: '13-18' }, { text: '18-23' }, { text: '23-28' }],
            [{ text: '28-33' }, { text: '33-38' }, { text: '38-70' }]
          ],
          one_time_keyboard: true,
          resize_keyboard: true
        })
      });
    break;

    case 'AGERANGE':
      store.commit('ADD_FIELD', { age: msg.text });
      store.commit('QUESTION', '');
      text('Thanks, bye');

      save({
        firstname: store.state.fields.firstname,
        lastname: store.state.fields.lastname,
        age: store.state.fields.age
      });
    break;
  }
});

/**
 * Autoselect serve mode
 * 
 * Based on current environment, app will run
 * either in WebHook mode or in Long-Polling mode.
 * Used to simplify a local bot testing.
 */
function autosetBotServeMode () {
  if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
    bot.setWebHook(process.env.HOST + bot.process.env.TELEGRAM_TOKEN);
    console.log('🚦 Bot Webhook mode');
  } else {
    console.log('🚦 Bot Long-Polling mode');
    bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
  }
}

async function ask (question, listener, options, uid) {
  options = options || {};
  uid = uid || store.state.message.chat.id;
  store.commit('QUESTION', listener);
  await bot.sendMessage(uid, question, options);
}

async function text (question, options, uid) {
  options = options || {};
  uid = uid || store.state.message.chat.id;
  await bot.sendMessage(uid, question, options);
}

function replyIs (message) {
  return store.state.message.text.includes(message);
}

module.exports = bot;
