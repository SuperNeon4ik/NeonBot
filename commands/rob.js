const Discord = require("discord.js")
let database = require('quick.db')
const fs = require('fs')

module.exports.run = async (_client, message, args, prefix) => {
  let user = message.guild.member(message.mentions.users.first())
  if (!user) return message.channel.send('Failture: Provide a user please!') 
  
  //let coins1 = parseInt(await database.fetch(`coins_${message.author.id}`))
  let diamonds1 = parseInt(await database.fetch(`diamonds_${message.author.id}`))
  //let bank1 = parseInt(await database.fetch(`bank_${message.author.id}`))
  
  //let coins2 = parseInt(await database.fetch(`coins_${message.author.id}`))
  let diamonds2 = parseInt(await database.fetch(`diamonds_${user.user.id}`))
  //let bank2 = parseInt(await database.fetch(`bank_${message.author.id}`))
  
  let amount = parseInt(args[1])
  if(!amount) return message.channel.send('```Failture: Provite an amount```');
  if(amount > diamonds2) return message.channel.send('```Failture: He doesn\'t have soooo many diamonds```');
  
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTimestamp()
  .setColor("#a200ff")
  .setFooter(`©copyright | All Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setDescription(`**You successfully robbed ${user.user} for ${amount}**${getEmoji('609830156604932103', _client)}`)
  
  let newD = diamonds2 - amount
  let newB = diamonds1 + amount
  
  database.set(`diamonds_${message.author.id}`, newB)
  database.set(`diamonds_${user.user.id}`, newD)
  
  message.channel.send(embed)

  console.log(`[${Date()}] ${prefix}rob - User -- ${message.author.username}`)
}

module.exports.info = {
  name: "rob"
}

function getEmoji(id, _client){
  return _client.emojis.get(id).toString();
}