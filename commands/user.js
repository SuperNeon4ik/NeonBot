const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
  let user = message.guild.member(message.mentions.users.first());
  if (!user) {
  let embed
  let gameType = ""
  
  if(!message.author.presence.game){
       gameType = 'false'
    }
  else if(message.author.presence.game.type === 0){
     gameType = "Playing"
  }
  else if(message.author.presence.game.type === 1){
     gameType = "Streaming"
  }
  else if(message.author.presence.game.type === 2){
     gameType = "Listening"
  }
  else if(message.author.presence.game.type === 3){
     gameType = "Watching"
  }
  else{
    gameType = 'false'
  }
  
  //let user = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
  //if (!user) user = message.guild.member(message.author.id)
  let Nuser = message.guild.member(message.author.id)
  let roleText = Nuser.highestRole
  
  if(gameType === 'false'){
  embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle('**__User Info__**')
  .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setTimestamp()
  .setImage(message.author.avatarURL)
  .setColor('#a200ff')
  .addField('User', `**${message.author}**`, true)
  .addField('Tag', `**__${message.author.tag}__**`, true)
  .addField('ID', `**__${message.author.id}__**`, true)
  .addField('Highest role', roleText, true)
  .addField('Is bot?', `**__${message.author.bot}__**`, true)
  .addField('Created at', `**__${message.author.createdAt}__**`, true)
  }
  else{
      embed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setTitle('**__User Info__**')
  .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setTimestamp()
  .setImage(message.author.avatarURL)
  .setColor('#a200ff')
  .addField('User', `**${message.author}**`, true)
  .addField('Tag', `**__${message.author.tag}__**`, true)
  .addField('ID', `**__${message.author.id}__**`, true)
  .addField(gameType, `**[${message.author.presence.game.name}](${message.author.presence.game.url})**`, true)
  .addField('Highest role', roleText, true)
  .addField('Is bot?', `**__${message.author.bot}__**`, true)
  .addField('Created at', `**__${message.author.createdAt}__**`, true)
  }
  
  message.channel.send(embed)
  }
  
  if (user){
    let embed
    let JUser = user.user
    let gameType = ""
  if(!JUser.presence.game){
    gameType = 'false'
  }
  else if(JUser.presence.game.type === 0){
     gameType = "Playing"
  }
  else if(JUser.presence.game.type === 1){
     gameType = "Streaming"
  }
  else if(JUser.presence.game.type === 2){
     gameType = "Listening"
  }
  else if(JUser.presence.game.type === 3){
     gameType = "Watching"
  }
  else{
    gameType = 'false'
  }
  
  let roleText = user.highestRole
  
  if(gameType === 'false'){
  embed = new Discord.RichEmbed()
  .setAuthor(JUser.username, JUser.avatarURL)
  .setTitle('**__User Info__**')
  .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setTimestamp()
  .setImage(JUser.avatarURL)
  .setColor('#a200ff')
  .addField('User', `**${JUser}**`, true)
  .addField('Tag', `**__${JUser.tag}__**`, true)
  .addField('ID', `**__${JUser.id}__**`, true)
  .addField('Highest role', roleText, true)
  .addField('Is bot?', `**__${JUser.bot}__**`, true)
  .addField('Created at', `**__${JUser.createdAt}__**`, true)
  }
  else{
    embed = new Discord.RichEmbed()
  .setAuthor(JUser.username, JUser.avatarURL)
  .setTitle('**__User Info__**')
  .setFooter(`©copyright | All  Rights Reserved | Neon's Team`, _client.user.avatarURL)
  .setTimestamp()
  .setImage(JUser.avatarURL)
  .setColor('#a200ff')
  .addField('User', `**${JUser}**`, true)
  .addField('Tag', `**__${JUser.tag}__**`, true)
  .addField('ID', `**__${JUser.id}__**`, true)
  .addField(gameType, `**[${JUser.presence.game.name}](${JUser.presence.game.url})**`, true)
  .addField('Highest role', roleText, true)
  .addField('Is bot?', `**__${JUser.bot}__**`, true)
  .addField('Created at', `**__${JUser.createdAt}__**`, true)
  }
  
  message.channel.send(embed)
  }
  
  console.log(`[${Date()}] ${prefix}server - User -- ${message.author.username}`)
}

module.exports.info = {
  name: "user"
}