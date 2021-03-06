// Bot created by Jishy

const Discord = require('discord.js');
const bot = new Discord.Client();

var commands = require('./commands/commands');
var listeners = require('./listeners/listeners');
const autoRespond = require('./autorespond');
const superagent = require('superagent');

const xp = require('./xp.json');

// Canvas for image manipulation
const Canvas = require('./node_modules/canvas');

const config = require('./config');

const welcome = require('./welcome');

// Logs Channel
const logCH = config.logsChannel;

var version = '1.9.1';

// Reports Channel ID
const reportCH = config.reportsChannel;

// Dates stuff
var today = new Date();
var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var day = today.getDate();
var month = (today.getMonth() + 1);
var timeLogs = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();

var xmasDays = 25 - (day);

bot.on('ready', () => {
    console.log('LoungeBot-2000 has loaded successfully.');

    bot.user.setPresence({
        game: {
            name: ("LoungeBot version: " + (version)),
            type: "PLAYING"
        },
        status: 'online'
    });

    //define important thing for directory stuff
    var fs = require('fs');
    //defines names of directories to create
    const dirnames = {
        logs: "logs",
        mutes: "mutes",
        bans: "bans",
        kicks: "kicks",
        warns: "warns",
        ships: "ships"
    }

    //creates directory "logs" if it doesn't already exist
    if (!fs.existsSync('./logs')) {
        fs.mkdirSync(dirnames.logs);
        console.log('"logs" directory created.');
    };
    //creates directory "mutes" if does not already exist
    if (!fs.existsSync('./logs/mutes')) {
        fs.mkdirSync('./logs/' + (dirnames.mutes));
        console.log('"mutes" directory created in directory "logs"');
    };
    //creates directory "bans" if does not already exist
    if (!fs.existsSync('./logs/bans')) {
        fs.mkdirSync('./logs/' + (dirnames.bans));
        console.log('"bans" directory created in directory "logs"');
    };
    //creates directory "kicks" if does not already exist
    if (!fs.existsSync('./logs/kicks')) {
        fs.mkdirSync('./logs/' + (dirnames.kicks));
        console.log('"kicks" directory created in directory "logs"');
    };
    //creates directory "warns" if does not already exist
    if (!fs.existsSync('./logs/warns')) {
        fs.mkdirSync('./logs/' + (dirnames.warns));
        console.log('"warns" directory created in directory "logs"');
    };
    if (!fs.existsSync('./ships')) {
        fs.mkdirSync('./' + (dirnames.ships));
        console.log('"ships" directory created.');
    };
});

// Color codes:
const aqua = 1752220
const green = 3066993
const blue = 3447003
const purple = 10181046
const gold = 15844367
const orange = 15105570
const red = 15158332
const grey = 9807270
const darkergrey = 8359053
const navy = 3426654
const darkaqua = 1146986
const darkgreen = 2067276
const darkblue = 2123412
const darkpurple = 7419530
const darkgold = 12745742
const darkorange = 11027200
const darkred = 10038562
const darkgrey = 9936031
const lightgrey = 12370112
const darknavy = 2899536

function emoji(id) {
    return bot.emojis.get(id).toString();
}

// When a new user joins the server
bot.on("guildMemberAdd", member => {
    if (member != bot) {
        //member.guild.channels.get(config.generalCH).send(`Welcome, ${member} ${welcome.MSG} \n${member.guild.name} now has ${member.guild.memberCount} members!`);
        const embed = new Discord.RichEmbed()
            .setTitle(`${member.guild.memberCount} members!`)
            .setDescription((welcome.MSG).replace('{member}', `${member}`))
            .setColor('#3ab4ff')
            .setTimestamp()
            .setThumbnail(member.user.avatarURL)
        member.guild.channels.get(config.generalCH).send(embed)
    }
});

bot.on('message', async msg => {
    mention = msg.mentions.users.first()
    msgLower = msg.content.toLowerCase();

    if (msgLower === "canoe man" || msgLower === "canoeman") {
        msg.react("🛶");
        msg.channel.send("***Canoe Man***", {
            files: [
                "./assets/canoeman.mp4"
            ]
        })
    }

    if (msgLower === "disco dog" || msgLower === "discodog") {
        msg.react("🐩");
        msg.channel.send("***Jajaja***", {
            files: [
                "./assets/Fqd4bwiWayi5NRS6.mp4"
            ]
        })
    }

    if (msgLower === "ducks" || msgLower === "quacks") {
        msg.react("🦆");
        msg.channel.send("***Quack Quack Quack***", {
            files: [
                "./assets/0BjSDyFXMmVp9Kp3.mp4"
            ]
        })
    }

    if (msgLower === "it's too big" || msgLower === "its too big") {
        msg.react("👀")
        msg.channel.send("*That's what she said :eyes:*");
    }

    if (msgLower === "owo") {
        msg.channel.send("***What's dis?***");
    }

    if (msgLower === "nyoom") {
        if (msg.author.bot) {

        } else {
            msg.channel.send('*nyoom*');
        }
    }

    if (msgLower === "uwu") {
        msg.channel.send("**OwO**");
    }

    if (msgLower === "shut up bot") {
        msg.channel.send("https://media.discordapp.net/attachments/684434187344019547/699694863226109972/WILLINGWINGS81-ran-this-command.gif")
    }

    if (msgLower === "nasa") {
        msg.channel.send("*Give you the whole world, I'ma need space*")
    }

    if (msgLower.includes('gamers')) {
        msg.channel.send('***gay**mers*')
    }

    if (msgLower.includes('hmph') && !msg.author.bot) {
        var i
        for (i = 0; i < 5; i++) {
            msg.channel.send('***HMPH***')
        }
    }

    if (msgLower.includes('thats gay') || msgLower.includes('that\'s gay')) {
        msg.reply('no u')
    }

    if (msgLower.includes('charge your phone')) {
        msg.channel.send('you need some phone juice')
    }

    if ((msgLower === 'tea' || msgLower.includes('tea ') || msgLower.includes('🍵')) && !msg.author.bot) {
        msg.react(bot.emojis.get('694259745128710394'))
        msg.channel.send('*thats the tea sis*')
    }

    if (msgLower === ('minecraft')) {
        msg.channel.send('*minceraft*')
    }

    if (msgLower === "creeper") {
        msg.channel.send('aw man')
    }

    if (msgLower === "catz") {
        msg.channel.send('thats gay')
    }

    if ((msgLower === 'loungebot' || mention === bot.user && !msg.author.bot)) {
        msg.reply('yes?')
    }

    if (msgLower === 'k') {
        msg.channel.send('l')
    }

    if (msgLower === 'eve') {
        msg.channel.send('😊')
    }

    if (msgLower.includes('going to bed')) {
        msg.react(bot.emojis.get('715300092097331290'))
        msg.channel.send('Goodnight!')
    }

    if (msgLower === 'may the force be with you') {
        msg.react(bot.emojis.get('711283327105106019'))
    }

    if (msgLower.includes(' hell')) {
        msg.channel.send('https://media.giphy.com/media/QULUJhfNYkkladnvge/giphy.gif')
    }

    if (msgLower.includes('idc') && msg.author.bot === false) {
        msg.channel.send('yeah idc either')
    }

    if (msgLower === 'the lounge') {
        msg.channel.send('I work there, pretty cool server.')
    }

    if (msgLower === 'oof' && msg.author.bot === false) {
        msg.react(bot.emojis.get('711380594650775582'))
        msg.channel.send('OOF! *makes Roblox death noise*')
    }

    if (msgLower.includes('husbands')) {
        msg.channel.send('**Coliver**\nhttps://media1.tenor.com/images/016d200d8eff0e5a776d2efa9e5ac519/tenor.gif?itemid=12903103')
    }

    if (msgLower.includes('beautiful day')&& msg.author.bot === false) {
        msg.channel.send('It\'s a beautiful day to save lives ❤️')
    }

    if (msgLower === 'pride month') {
        msg.channel.send('*waves pride flag*')
        await msg.react("❤️")
        await msg.react("🧡")
        await msg.react("💛")
        await msg.react("💚")
        await msg.react("💙")
        await msg.react("💜")
    }

    if (msgLower.includes('shade')&& msg.author.bot === false) {
        msg.channel.send('*Shade never made anybody less gay*')
        msg.react(bot.emojis.get('713855006864048138'))
    }

    if(msgLower.includes('calm down')&& msg.author.bot === false) {
        msg.channel.send('https://tenor.com/view/you-need-to-calm-down-calm-down-taylorswift-yntcdmusicvideo-gif-14358567')
    }

    if(msgLower === 'shut up') {
        msg.channel.send('https://tenor.com/view/damn-taylor-swift-you-need-to-calm-down-yntcdmusicvideo-yntcd-gif-14358570')
    }

    if(msgLower === 'loungebot is awesome') {
        msg.channel.send('https://tenor.com/view/uh-huh-taylor-swift-city-of-lover-smiling-pleased-gif-17237760')
    }

    if(msgLower === 'daisies') {
        msg.channel.send('They tell me that I\'m crazy, but I\'ll never let \'em change me \'Til they cover me in daisies, daisies, daisies')
    }

    if(msgLower === 'uh oh') {
        msg.channel.send('*uh oh spaghettios*')
    }

    if(msgLower === 'rain on me') {
        msg.channel.send('https://tenor.com/view/lady-gaga-ariana-grande-lady-gaga-ariana-grande-lady-gaga-rain-on-me-ariana-grande-rain-on-me-gif-17288228')
    }

    if((msgLower === 'you find all my jokes funny' || msgLower === 'you find all of catzs jokes funny') && msg.author.bot === false) {
        msg.channel.send('No, I\'m being forced to laugh...')
    }

    if(msgLower === 'never really over') {
        msg.channel.send('https://tenor.com/view/katy-perry-nro-never-really-over-singing-dancing-gif-14376644')
    }

    if(msgLower.includes ('nyan cat')) {
        msg.channel.send('Nyanyanyanyanyanyanya \nhttps://media.discordapp.net/attachments/691855160632410143/711397115829682236/200.gif')
    }

    if((msgLower === 'ily loungebot' || msgLower === 'ilysm loungebot' || msgLower === 'i love you loungebot' || msgLower === 'i love u loungebot') && msg.author.bot === false) {
        msg.react("❤️")
        msg.channel.send('awwh! ily too! 🥺❤️')
    }

    if(msgLower.includes ('stupid love')) {
        msg.channel.send('*Freak out, I freak out, I freak out, I freak out (look at me)* https://tenor.com/view/stupid-love-lady-gaga-music-video-chromatica-dancing-gif-16456052')
    }

    if (msgLower === 'i can show you the world') {
        msg.channel.send(`***Schwining schwimmering schplendid***`, {
            files: [
                './assets/ALADIN.mp4'
            ]
        })
    }

    if(msgLower === 'thank u next') {
        msg.channel.send('*One taught me love, \nOne taught me patience, \nAnd one taught me pain*')
        msg.react(bot.emojis.get('715299694384775188'))
    }

    if(msgLower.includes ('7 rings')) {
        msg.channel.send('*My wrist, stop watchin\', my neck is flossy Make big deposits, my gloss is poppin\' You like my hair? Gee, thanks, just bought it I see it, I like it, I want it, I got it* https://tenor.com/view/7rings-isee-it-ilike-it-iwant-it-igot-it-ariana-grande-gif-13343260')
        msg.react("💍")
    }

    if(msgLower.includes ('break up with your girlfriend')) {
        msg.channel.send('*yuh yuh cuz im bored*')
    }

    if(msgLower === 'babylon') {
        msg.channel.send('*Strut it out, walk a mile \nServe it ancient city style \nTalk it out, babble on \nBattle for your life, Babylon!*')
    }

    if(msgLower === 'ping') {
        msg.channel.send('pong')
        msg.react(bot.emojis.get('716528494980497439'))
    }

    if (autoRespond[msg.content]) {
        msg.channel.send(autoRespond[msg.content])
    }

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (msg.content.indexOf(config.prefix) !== 0) return;

    const user = msg.mentions.users.first();

    var reason = args.slice(1).join(' ');

    // Botinfo command
    if (command === "botinfo") {
        commands.botinfocommand.botinfo(msg, args, version, config, bot);
    };

    // Mute command
    if (command === "mute") {
        commands.mutecommand.mute(bot, msg, args[2], logCH, args[3], timeLogs, args, reason, config);
    };

    // Clear messages command
    if (command === "purge") {
        commands.clearmsgcommand.clearmsg(msg, args, bot, logCH, config);
    };

    // Kick command
    if (command === "kick") {
        commands.kickcommand.kick(msg, user, reason, bot, logCH, date, time, timeLogs, config);
    };

    // Ban command
    if (command === "ban") {
        commands.bancommand.ban(bot, msg, user, logCH, reason, timeLogs, config);
    };

    // Report command
    if (command === "report") {
        commands.reportcommand.report(bot, args, reportCH, user, msg);
    };

    // Help command
    if (command === "help") {
        commands.helpcommand.help(bot, msg, args, config, Discord);
    };

    // Warn command
    if (command === "warn") {
        commands.warncommand.warn(bot, msg, red, green, user, config, args, date, time, timeLogs, logCH);
    };

    // Ship command
    if (command === "ship") {
        commands.shipcommand.ship(bot, msg, args, purple, Canvas, Discord, red, config);
    };

    // Check level and XP info
    if (command === "level") {
        commands.levelcommand.lvlcheck(msg, args, Discord, user, xp);
    };

    // Edit bot command prefix
    if (command === "changeprefix") {
        commands.changeprefix.changeprefix(msg, args, Discord, green, red, config);
    };

    // Autoresponse command
    if (command === "autoresponse") {
        commands.autoresponse.autoresponse(msg, args, Discord, green, red, darkgold, autoRespond, config);
    };

    // Random cat image command
    if (command === "cat") {
        commands.cat.cat(msg, Discord, darkorange, superagent);
    }

    // Random dog image command
    if (command === "dog") {
        commands.dog.dog(msg, Discord, darkorange, superagent);
    }

    // Random president command
    if (command === "president") {
        commands.president.president(msg, Discord, red, blue, grey);
    }

    // Staff help command
    if (command === "staffhelp") {
        commands.staffhelp.staffhelp(msg, Discord, config, blue, red);
    }

    // Magic 8Ball
    if (command === "8ball") {
        commands.eightball.eightball(bot, Discord, msg, args, red, darkred, green, blue);
    }

    // Random history command
    if (command === "history") {
        commands.history.history(msg, Discord);
    }

    // Edit history responses
    if (command === "edithistory") {
        commands.history.edit(msg, args, Discord, bot)
    }

    // Suggestion form
    if (command === "suggest") {
        commands.suggest.suggestion(msg, Discord)
    }

    // Bug reports form
    if (command === "bug") {
        commands.bugreport.run(msg, Discord)
    }

    // change welcome message
    if (command === "welcome") {
        commands.welcome.change(msg, args, welcome, Discord)
    }

    // Random Television command
    if (command === "tv") {
        commands.tv.tv(msg, Discord)
    }

    // Edit Televison responses
    if (command === "edittv") {
        commands.tv.edit(msg, args, Discord, bot)
    }

    // Polls
    if (command === "createpoll") {
        commands.poll.create(msg, Discord, args, config, bot)
    }

    // Hug command
    if (command === "hug") {
        commands.hug.hug(msg, args, Discord)
    }

    // Trivia command
    if (command == "trivia") {
        commands.trivia.question(bot, config, Discord, msg, args, xp)
    }

    // Meme command
    if (command === "meme") {
        commands.meme.subreddit(Discord, msg)
    }

    //Disney Parks Command
    if (command === "parks") {
        commands.parks.disney(msg, args, Discord, config)
    }

    //Edit Disney Parks Responses
    if (command === "editparks") {
        commands.parks.edit(msg, args, Discord, bot)
    }

    //Disney Movies Command
    if (command === "movies") {
        commands.movies.disney(msg, Discord)
    }

    //Edit Disney Movies Command
    if (command === "editmovies") {
        commands.movies.edit(msg, args, Discord, bot)
    }

    //Bird Command
    if (command === "bird" || command === 'birb') {
        commands.bird.subreddit(Discord,msg)
    }

    //Dadjokes Command
    if (command === "dadjokes" || command === 'dadjoke') {
        commands.dadjokes.dadjokes(msg, Discord, darkblue)
    }

    //Member Count Command
    if (command === "members") {
        commands.membercount.run(msg, Discord)
    }

    //Pride Command
    if (command === "pride") {
        commands.pride.pride(msg, Discord)
    }

    //Edit Pride Command
    if (command === "editpride") {
        commands.pride.edit(msg, args, Discord, bot)
    }

    //Send Message Command
    if (command === "sendmessage") {
        commands.sendmessage.run(bot, msg, args, Discord, config)
    }
});
//
//  Main listeners poop goes below here
//


// this has to be separate from rest of bot
bot.on("message", (msg) => {
    // Listening for everything basically, XP is lit
    if ((msg.channel.type != "dm") && (!msg.author.bot) && (!msg.content.startsWith(config.prefix)) && (msg.channel.id != (config.botsCH)) && (msg.channel.id != (config.spamCH) && (msg.channel.id != (config.dankCH)))) {
        listeners.XPGiver.level(msg, Discord, bot, xp, config);
    };
});

//when a message is deleted
bot.on("messageDelete", (messageDelete) => {
    listeners.messageDeleteListener.msgDelete(bot, messageDelete, logCH, darkblue, Discord);
});

bot.login(config.token);
