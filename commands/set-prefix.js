const Discord = require("discord.js")
let cfg = require('../botCfg.json')

module.exports.run = async (_client, message, args, prefix) => {
  let nPref = args[0]
  if (!nPref) return message.channel.send('```Failture: Provide a prefix please!```')
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("```Failture: You don't have permission to do this!```");
  if (nPref === prefix) return message.channel.send('```Failture: Provide NEW prefix please!```')
  
  cfg[message.guild.id] = {
    prefix: nPref
  };
  
  message.channel.send(`Successfully setted \`${nPref}\` like a prefix!!!`)

  console.log(`[${Date()}] ${prefix}set-prefix - User -- ${message.author.username}`)
}

module.exports.info = {
  name: "set-prefix"
}