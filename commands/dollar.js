const Discord = require("discord.js")
const database = require('quick.db')

module.exports.run = async (_client, message, args, prefix) => {
  let cmd = args[0]
  if (!cmd){
    
    let coins = parseInt(await database.fetch(`coins_${message.author.id}`))
    let diamonds = parseInt(await database.fetch(`diamonds_${message.author.id}`))
    let bank = parseInt(await database.fetch(`bank_${message.author.id}`))
    
    let embed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setFooter(`©copyright | All Rights Reserved | Neon's Team`, _client.user.avatarURL)
    .setTimestamp()
    .addField('Coins', coins + getEmoji('609836783227895848', _client))
    .addField('Diamonds', diamonds + getEmoji('609830156604932103', _client))
    .addField('Bank account', bank + getEmoji('609830156604932103', _client))
    
    message.channel.send(embed)
  }
  console.log(`[${Date()}] ${prefix}$ - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "money"
}

function getEmoji(id, _client){
  return _client.emojis.get(id).toString();
}