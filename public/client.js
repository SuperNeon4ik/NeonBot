// client-side js
// run by the browser each time your view template referencing it is loaded

//console.log('hello world :o');

//let dreams = [];

/*const Discord = require("../discord.js");
const fs = require('fs');
const cfg = require("../botCfg.json");
const Client = new Discord.Client();
Client.commands = new Discord.Collection();
let token = process.env.SECRET;
let DCol = "#a200ff"

console.log(`[${Date()}] Connecting...`)

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if (jsFile.length <= 0){
        console.log("Failture: Couldn't find commands")
        return;
    }
    cfg.cmdSize = jsFile.length;

    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[${Date()}] ${f} loaded`)
        Client.commands.set(props.info.name, props);
    })
})

Client.on("ready", async () =>{
    console.log(`[${Date()}] Connected`)
    var guildArr = Client.guilds.array();
    Client.user.setActivity(`${Client.guilds.size} servers | Neon's Team`, {url: "https://www.twitch.tv/superneonofficialgg", type: "STREAMING"})
    for (var i = 0; i <= Client.guilds.size - 1; i++){
        console.log(`[${Date()}] Connected server -- ${guildArr[i].name}`)
    }
    console.log(`[${Date()}] Connected to ${Client.guilds.size} servers`)
    console.log(`[${Date()}] Ready`)
})

Client.on("message", async message =>{
    if (message.author.bot) return;
    let prefix = "%"
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)
    
    let gIndex = Client.guilds.size;
    var guildArr = Client.guilds.array();
    let users = 0; 
    for (let i = 0; i < gIndex; i++){
        users = users + guildArr[i].members.size;
        cfg.mmbrSize = users + 1;
    }
    
    let commandFile = Client.commands.get(cmd.slice(prefix.length))
    if(commandFile) commandFile.run(Client, message, args, cfg.prefix);
})

Client.login(token);*/


// define variables that reference elements on our page
