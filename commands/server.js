const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
  let channelsC = message.guild.channels.size
  let channels = message.guild.channels.array();
  let TxtChannels = 0
  let VoiceChannels = 0
  let Categories = 0
  
  for(let i = 0; i < channelsC; i++){
    if(channels[i].type === 'text'){
       TxtChannels++
    }
    if(channels[i].type === 'voice'){
       VoiceChannels++
    }
    if(channels[i].type === 'category'){
       Categories++
    }
  }
  
  let embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle('**__Server Info__**')
  .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setTimestamp()
  .setThumbnail(message.guild.iconURL)
  .setColor('#a200ff')
  .addField('Server Name', `**${message.guild.name}**`, true)
  .addField('Server ID', `**__${message.guild.id}__**`, true)
  .addField('Channels Count', `**__${channelsC}__**`, true)
  .addField('Text Channels Count', `**__${TxtChannels}__**`, true)
  .addField('Voice Channels Count', `**__${VoiceChannels}__**`, true)
  .addField('Categories Count', `**__${Categories}__**`, true)
  .addField('Users Count', `**__${message.guild.memberCount}__**`, true)
  .addField('Owner', `<@${message.guild.ownerID}>`, true)
  .addField('Created at', `**${message.guild.createdAt}**`, true)
  
  message.channel.send(embed)

  console.log(`[${Date()}] ${prefix}server - User -- ${message.author.username}`)
}

module.exports.info = {
  name: "server"
}