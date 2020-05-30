exports.run = function (bot, msg, args, Discord, config) {
    if (msg.member.hasPermission(`ADMINISTRATOR`)) {
        if (args.length <= 1 || !msg.mentions.channels.first()) {
            const invalidArgs = new Discord.RichEmbed()
                .setTitle(`Invalid Arguments`)
                .setDescription(`Please use the format: \`${config.prefix}sendmessage <channel> <message>\``)
                .setColor(`RED`)
            msg.channel.send(invalidArgs)
        } else {
            let channel = msg.mentions.channels.first().id
            let message = args.slice(1).join(' ')

            bot.channels.get(channel).send(message)
        }
    } else {
        msg.reply(`you do not have permission to run this command.`)
    }
}