const Discord = require("discord.js")
//import * as NTCico from "G:/My Projects/VisualProjects/MeonBot/imgs/NeonsTeamIco.jpg";
let prefix = "%"

module.exports.run = async (_client, message, args, prefix) => {
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(_client.user.avatarURL)
    .addField(`${prefix}help`, `Help command`, true)
    .addField(`${prefix}set-prefix <prefix>`, `Set prefix command`, true)
    .addField(`${prefix}xp <optional:user>`, `Xp check command`, true)
    .addField(`${prefix}idea <idea>`, `Send idea command`, true)
    .addField(`${prefix}bug <bug>`, `Report bug command`, true)
    .addField(`${prefix}info`, `Bot info command`, true)
    .addField(`${prefix}user <optional:user>`, `User info command`, true)
    .addField(`${prefix}server`, `Server info command`, true)
    .addField(`${prefix}ban <user> <optional:reason>`, `Ban member command`, true)
    .addField(`${prefix}report <user> <reason>`, `Report member command`, true)
    .addField(`${prefix}kick <user> <optional:reason>`, `Kick member command`, true)
    .addField(`${prefix}m play <title/YouTube url>`, `Music play command`, true)
    .addField(`${prefix}m skip`, `Music skip command`, true)
    .addField(`${prefix}m stop`, `Music stop command`, true)
    .addField(`${prefix}invite`, `Bot invite link`, true)
    .addField(`${prefix}money <optional:user>`, `Check money command`, true)
    .addField(`${prefix}bank <amount>`, `Bank command`, true)
    .addField(`${prefix}unbank <amount>`, `Unbank command`, true)
    .addField(`${prefix}rob <user> <amount>`, `Rob command`, true)
    .addField(`${prefix}donate`, `Some donate links`, true)

    message.channel.send(helpEmbed)

    console.log(`[${Date()}] ${prefix}help - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "help"
}