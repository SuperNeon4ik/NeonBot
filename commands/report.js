const Discord = require("discord.js")
const fs = require("fs");
const cfg = require("../botCfg.json")

module.exports.run = async (_client, message, args, prefix) => {
    let Reported = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
    if (!Reported) return message.channel.send("```Failture: Can't find user!```");
    if (Reported.user === message.author) return message.channel.send("```Failture: Can't report yourself!```");
    let reason = args.join(" ").slice(22);
    if (!reason) return message.channel.send("```Failture: No reason!```");

    let embed = new Discord.RichEmbed()
    .setColor("#fffb00")
    .setTimestamp()
    .setThumbnail(Reported.user.avatarURL)
    .setTitle("***__Report__***")
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addField(`Reported`, Reported.user, true)
    .addField(`Reported by`, message.author, true)
    .addField(`Channel`, `<#${message.channel.id}>`, true)
    .addField(`Reason`, `***__${reason}__***`, true)
    .addField(`Time`, `***__${message.createdAt}__***`, true);

    let logChannel = message.guild.channels.find("name", "log")
    if (!logChannel){
        //msg.guild.createChannel(`log`)
        let logChannel = message.guild.createChannel(`log`, {
            permissionOverwrites: [{
              id: message.guild.id,
              deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
              //allow: ['SEND_MESSAGES']
            }]
        });

        if(!logChannel) return message.channel.send("```Failture: Channel error!```")
        console.log(`[${Date()}] Bot : Channel created - Server -- ${message.guild.name}; Channel name -- ${logChannel.name}`)
    }

    if (logChannel != null)
        logChannel.send(embed)

    console.log(`[${Date()}] ${prefix}report - User -- ${message.author.username}; Reported -- ${Reported.user.tag}; Reason -- ${reason}; Server -- ${message.guild.name}`)
}

module.exports.info = {
    name: "report"
}