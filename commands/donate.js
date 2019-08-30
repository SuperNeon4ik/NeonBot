const Discord = require("discord.js")

module.exports.run = async (_client, message, args, prefix) => {
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#a200ff")
    .addField('Bot invite link', '***[Click!](https://discordapp.com/oauth2/authorize?client_id=597606520330649622&scope=bot&permissions=8)***')
    .addField('Bot QiWi link', '***[Click!](https://qiwi.com/p/380973967177)***')
    .addField('Bot DonationAlerts link', '***[Click!](https://www.donationalerts.com/r/superneonyt)***')

    message.channel.send(helpEmbed)

    console.log(`[${Date()}] ${prefix}donate - User -- ${message.author.username}`)
}

module.exports.info = {
    name: "donate"
}