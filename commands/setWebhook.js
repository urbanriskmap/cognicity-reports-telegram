// Set a Telegram bot webhook
// Run: npx babel-node commands/setWebhook.js
import axios from 'axios';
require('dotenv').config();
import config from '../src/config';
axios.post(config.TELEGRAM_ENDPOINT + config.BOT_TOKEN + '/setWebhook' + '?' + 'url=' + config.API_GW_WEBHOOK + '&max_connections=100' + '&allowed_updates=["message"]')
    .then((res) => {
        console.log(res);
    }).catch((err) => console.log(err));
