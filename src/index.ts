const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: 'dota2attitude',
        password: `oauth:${process.env.auth_token}`
    },
    channels: [ 'my_name' ]
});

client.connect();

client.on('message', (channel: any, tags: any, message: any, self: any) => {
    // Ignore echoed messages.
    if(self) return;

    if(message.toLowerCase() === '!hello') {
        // "@alca, heya!"
        client.say(channel, `@${tags.username}, heya!`);
    }
});
