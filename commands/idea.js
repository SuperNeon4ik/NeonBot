const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
    let msg = args.join(" ")
    
    let embed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .setAuthor('Idea message', message.guild.iconURL)
    .setTimestamp()
    .setThumbnail(message.author.avatarURL)
    .addField('User', message.author, true)
    .addField('Server', message.guild.name, true)
    .addField('Channel', message.channel.name, true)
    .addField('Idea description', msg, true)
    
    _client.users.get('499904241993908235').send(embed)
}

module.exports.info = {
    name: "idea"
}