const Discord = require ('discord.js')
let db = require ('quick.db')

module.exports.run = async (bot, message, args) => {
if (message.author.id !== "499904241993908235") return bot.send('<a:ban:602404998244073488>')
  //if(e) return message.channel.send(err)
  message.channel.send('Команда обрабатывается...').then(msg => msg.edit('```' + require('child_process').execSync(args.join(' ')).toString('utf8') + '```')).catch(err => { message.channel.send('```' + err + '```') })
}
module.exports.info = {
  name: 'shell'
}