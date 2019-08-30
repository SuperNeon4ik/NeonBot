const Discord = require("discord.js")
let prefix = "%"

module.exports.run = async (_client, msg, args, prefix) => {
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send("```Failture: You don't have permission to do this!```");
    let user = msg.guild.member(msg.mentions.users.first() || msg.guild.member.get(args[0]));
    if (!user) return msg.channel.send("```Failture: Can't find user!```");
    if (!user.kickable) return msg.channel.send("```Failture: Can't kick this user!```");
    let reason = args.join(" ").slice(22);

    let kickEmbed;
    if (reason == ""){
        kickEmbed = new Discord.RichEmbed()
        .setTimestamp()
        .setAuthor(user.displayName, user.user.avatarURL)
        .setColor("#ff8400")
        .setFooter(`©copyright | All  Rights Reserved | Neon's Team`) 
        .setThumbnail(user.user.avatarURL)
        .setTitle(`***__Kick__***`)
        .addField(`Kicked`, `***${user.user.tag}***`, true)
        .addField(`Admin`, msg.author, true)
        .addField(`Channel`, `<#${msg.channel.id}>`, true)
        .addField(`Reason`, `No reason`, true);
    }
    else{
        kickEmbed = new Discord.RichEmbed()
        .setTimestamp()
        .setAuthor(user.displayName, user.user.avatarURL)
        .setColor("#ff8400")
        .setFooter(`©copyright | All  Rights Reserved | Neon's Team`) 
        .setThumbnail(user.user.avatarURL)
        .setTitle(`***__Kick__***`)
        .addField(`Kicked`, `***${user.user.tag}***`, true)
        .addField(`Admin`, msg.author, true)
        .addField(`Channel`, `<#${msg.channel.id}>`, true)
        .addField(`Reason`, reason, true);
    }

    let kickChannel = msg.guild.channels.find("name", "log")
    if (!kickChannel){
        //msg.guild.createChannel(`log`)
        kickChannel = msg.guild.createChannel(`log`, {
            permissionOverwrites: [{
              id: msg.guild.id,
              deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
              //allow: ['SEND_MESSAGES']
            }]
        });
        /*kickChannel = kickChannel.overwritePermissions(msg.guild.defaultRole, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true
        })  
        .catch(console.error);*/

        if(!kickChannel) return msg.channel.send("```Failture: Channel error!```")
        console.log(`[${Date()}] Bot : Channel created - Server -- ${msg.guild.name}; Channel name -- ${kickChannel.name}`)
    }



    user.kick(reason)
    if (kickChannel != null){
        kickChannel.send(kickEmbed)
    }
    console.log(`[${Date()}] ${prefix}kick - Admin -- ${msg.author.tag}; User -- ${user.user.tag}; Server -- ${msg.guild.name}`)
}

module.exports.info = {
    name: "kick"
}