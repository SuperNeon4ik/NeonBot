const Discord = require("discord.js")

module.exports.run = async (_client, msg, args, prefix) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("```Failture: You don't have permission to do this!```");
    let user = msg.guild.member(msg.mentions.users.first() || msg.guild.member.get(args[0]));
    if (!user) return msg.channel.send("```Failture: Can't find user!```");
    if (user.user === msg.author) return msg.channel.send("```Failture: Can't ban yourself!```");
    if (!user.bannable) return msg.channel.send("```Failture: Can't ban this user!```");
    let reason = args.join(" ").slice(22);

    let embed;
    if (reason == ""){
        embed = new Discord.RichEmbed()
        .setTimestamp()
        .setAuthor(user.displayName, user.user.avatarURL)
        .setColor("#ff0000")
        .setFooter(`©copyright | All  Rights Reserved | Neon's Team`) 
        .setThumbnail(user.user.avatarURL)
        .setTitle(`***__Ban__***`)
        .addField(`Banned`, `***${user.user.tag}***`, true)
        .addField(`Admin`, msg.author, true)
        .addField(`Channel`, `<#${msg.channel.id}>`, true)
        .addField(`Reason`, `No reason`, true);
    }
    else{
        embed = new Discord.RichEmbed()
        .setTimestamp()
        .setAuthor(user.displayName, user.user.avatarURL)
        .setColor("#ff0000")
        .setFooter(`©copyright | All  Rights Reserved | Neon's Team`) 
        .setThumbnail(user.user.avatarURL)
        .setTitle(`***__Ban__***`)
        .addField(`Banned`, `***${user.user.tag}***`, true)
        .addField(`Admin`, msg.author, true)
        .addField(`Channel`, `<#${msg.channel.id}>`, true)
        .addField(`Reason`, reason, true);
    }

    let banChannel = msg.guild.channels.find("name", "log")
    if (!banChannel){
        //msg.guild.createChannel(`log`)
        let banChannel = msg.guild.createChannel(`log`, {
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

        if(!banChannel) return msg.channel.send("```Failture: Channel error!```")
        console.log(`[${Date()}] Bot : Channel created - Server -- ${msg.guild.name}; Channel name -- ${banChannel.name}`)
    }



    user.ban(reason)
    if (banChannel != null)
        banChannel.send(embed)
    console.log(`[${Date()}] ${prefix}ban - Admin -- ${msg.author.tag}; User -- ${user.user.tag}; Server -- ${msg.guild.name}`)
}

module.exports.info = {
    name: "ban"
}