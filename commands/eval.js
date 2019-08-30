const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
  if(message.author.id === "499904241993908235"){
        try{
            const code = args.join(" ")
            let evaled = eval(code);

            let embed = new Discord.RichEmbed()
            .setColor("#a200ff")
            .setAuthor('Eval output', message.author.avatarURL)
            .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
            .setTimestamp()
            .setDescription(`\`\`\`${evaled}\`\`\``)
            
            message.channel.send(embed)
        } catch (err){
            let embed = new Discord.RichEmbed()
            .setColor("#a200ff")
            .setAuthor('Eval output', message.author.avatarURL)
            .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
            .setTimestamp()
            .setDescription(`\`\`\`${err}\`\`\``)
            
            message.channel.send(embed)
        }
    }

    console.log(`[${Date()}] ${prefix}eval - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "eval"
}