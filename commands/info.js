const Discord = require("discord.js")
const fs = require("fs");
const cfg = require("../botCfg.json")

module.exports.run = async (_client, message, args, prefix) => {
    let cmdSize = cfg.cmdSize;
    let mmbrSize = cfg.mmbrSize;

    let infoEmbed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
    .setTimestamp()
    .setThumbnail(_client.user.avatarURL)
    .addField(`Name`, `***${_client.user.tag}***`, true)
    .addField(`Mention`, `${_client.user}`, true)
    .addField(`Creators`, `<@499904241993908235>, <@591669127660306474>`, true)
    .addField(`Company`, `***Neon's Team***`, true)
    .addField(`Servers`, `***__${_client.guilds.size}__***`, true)
    .addField(`Users`, `***__${mmbrSize}__***`, true)
    .addField(`Commands`, `***__${cmdSize}__***`, true)
    .addField(`Created at`, _client.user.createdAt, true)

    message.channel.send(infoEmbed)

    console.log(`[${Date()}] ${prefix}info - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "info"
}