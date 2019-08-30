const Discord = require("discord.js")
let database = require('quick.db')
const fs = require('fs')

module.exports.run = async (_client, message, args, prefix) => {
  let coins = parseInt(await database.fetch(`coins_${message.author.id}`))
  let diamonds = parseInt(await database.fetch(`diamonds_${message.author.id}`))
  let bank = parseInt(await database.fetch(`bank_${message.author.id}`))
  
  let amount = parseInt(args[0])
  if(!amount) return message.channel.send('```Failture: Provite an amount```');
  if(amount > diamonds) return message.channel.send('```Failture: You are not have soooo many diamonds```');
  
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTimestamp()
  .setColor("#a200ff")
  .setFooter(`©copyright | All Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setDescription(`**You successfully topped up your bank account for ${amount}**${getEmoji('609830156604932103', _client)}`)
  
  let newD = diamonds - amount
  let newB = bank + amount
  
  database.set(`diamonds_${message.author.id}`, newD)
  database.set(`bank_${message.author.id}`, newB)
  
  message.channel.send(embed)

  console.log(`[${Date()}] ${prefix}bank - User -- ${message.author.username}`)
}

module.exports.info = {
  name: "bank"
}

function getEmoji(id, _client){
  return _client.emojis.get(id).toString();
}