const Discord = require("discord.js")
const database = require('quick.db')

module.exports.run = async (_client, message, args, prefix) => {
  let cmd = args[0]
  if (!cmd){
    
    let xp = await database.fetch(`xp_${message.guild.id}_${message.author.id}`)
    let lvl = await database.fetch(`lvl_${message.guild.id}_${message.author.id}`)

    let embed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`©copyright | All Rights Reserved | Neon's Team`, _client.user.avatarURL)
    .setTimestamp()
    .addField('Experience points', `[${xp}/1000]`, true)
    .addField('Level', lvl, true)
    .setImage('https://cdn.glitch.com/7590bf34-fb34-4a0a-b182-0223f6ed7018%2Flevel-logo.png?v=1565534720770')
    
    message.channel.send(embed)
  }
  else{
    if(message.guild.member(message.mentions.users.first())){
      let user = message.guild.member(message.mentions.users.first());
      
      let xp = await database.fetch(`xp_${message.guild.id}_${user.user.id}`)
      if(xp === null){
        xp = 0;
        database.add(`xp_${message.guild.id}_${user.user.id}`, 0)
      }
  
      let lvl = await database.fetch(`lvl_${message.guild.id}_${user.user.id}`)
      if(lvl === null){
        lvl = 0;
        database.add(`lvl_${message.guild.id}_${user.user.id}`, 0)
      }
      
    
      let embed = new Discord.RichEmbed()
      .setColor("#a200ff")
      .setAuthor(user.user.username, user.user.avatarURL)
      .setFooter(`©copyright | All Rights Reserved | Neon's Team`, _client.user.avatarURL)
      .setTimestamp()
      .addField('Experience points', `[${xp}/1000]`, true)
      .addField('Level', lvl, true)
      .setImage('https://cdn.glitch.com/7590bf34-fb34-4a0a-b182-0223f6ed7018%2Flevel-logo.png?v=1565534720770')
    
      message.channel.send(embed)
    }
  }
  console.log(`[${Date()}] ${prefix}xp - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "xp"
}

function getEmoji(id, _client){
  return _client.emojis.get(id).toString();
}
