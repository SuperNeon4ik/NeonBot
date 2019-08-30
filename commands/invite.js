const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .addField('Bot invite link', '***[Click!](https://discordapp.com/oauth2/authorize?client_id=597606520330649622&scope=bot&permissions=8)***')
    .setURL('https://discordapp.com/oauth2/authorize?client_id=597606520330649622&scope=bot&permissions=8')

    message.channel.send(helpEmbed)

    console.log(`[${Date()}] ${prefix}invite - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "invite"
}