const tmi = require('tmi.js');
require('dotenv').config()
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true},
    identity: {
        username: 'dota2attitude',
        password: process.env.TWITCH_OAUTH_TOKEN
    },
    channels: [ 'dota2attitude' ]
});
client.connect();
client.on('message', (channel, tags, message, self) => {
    // This will tell the bot to ignore echoed messages.
    if(self) return;

    let currMessage = message.toLowerCase();

    const zoomerDictionary = [
        { slangWord: "fam", definition: "Fam is a shorter word for family, but don't be fooled– it can be used to describe your friends or the way Millennials use \"bro\"." },
        { slangWord: "glow up", definition: "This means a makeover or transformation from bad to good." },
        { slangWord: "ceo", definition: "If you're the CEO of something, it means you've mastered it or you're a pro." },
        { slangWord: "eperson", definition: "This is similar to emo or goth culture, but they use the internet to express themselves." },
        { slangWord: "w", definition: "To most, it's just a letter of the alphabet, but to Gen Zers it simply means \"win\"." },
        { slangWord: "dank", definition: "If something is dank, it's excellent or of very high quality." },
        { slangWord: "salty", definition: "Gen Zs use this term when they're feeling jealous." },
        { slangWord: "big yikes", definition: "The slang speaks for itself in this one. Big Yikes is used when you're so embarrassed that \"yikes\" doesn't do justice." },
        { slangWord: "cap", definition: "An older but still relevant term, cap means to lie. If you say \"no cap\" it means you are being authentic or truthful." },
        { slangWord: "boujee", definition: "This term can be used if you're describing something or someone that is extravagant or fancy." },
        { slangWord: "high key", definition: "High-key is simply the opposite of being low-key" },
        { slangWord: "finna", definition: "Finna is a shortened term for saying \"I'm going to\"." },
        { slangWord: "sip tea", definition: "Sip tea is an alternative to \"spilling the tea\", meaning you're sitting back and listening to the gossip rather than partaking in it." },
        { slangWord: "l", definition: "Another simple letter turned slang, L is the opposite of a W– meaning a loss rather than a win." },
    ]

    if(currMessage.includes('!urban')) {
        const firstFoundSlang = [zoomerDictionary.find(
            ({slangWord}) => currMessage.includes(slangWord))];
        firstFoundSlang
            ?.forEach(({ slangWord, definition }) => {
            if (currMessage.includes(slangWord)) {
                client.say(channel, definition);
                return;
            }
        })
    }
    function randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    if(currMessage.includes('!zoomerize')) {
        const zoomerizedTermNum = randomIntFromInterval(0, 13);
        client.say(channel, `WOW! I totally agree, that is so ${zoomerDictionary[zoomerizedTermNum]?.slangWord.toUpperCase()}!!!`)
    }
});
