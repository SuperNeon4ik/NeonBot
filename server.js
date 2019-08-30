const Discord = require("discord.js");
const fs = require('fs');
const cfg = require("./botCfg.json");
const Client = new Discord.Client();
Client.commands = new Discord.Collection();
let token = process.env.SECRET;
let database = require('quick.db')

const actv = require('./activity.js')

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
    for (var i = 0; i <= Client.guilds.size - 1; i++){
        console.log(`[${Date()}] Connected server -- ${guildArr[i].name}`)
    }
    console.log(`[${Date()}] Connected to ${Client.guilds.size} servers`)
    console.log(`[${Date()}] Ready`)
  
  actv.start(Client)
})

Client.on("guildMemberAdd", async m => {
  if(m.user.bot === true){
    if (m.guild.id === "264445053596991498"){}
    else{
    let embed = new Discord.RichEmbed()
    .setDescription(`**Hello, ${m.user}! Welcome to \`${m.guild.name}\`!!! \nPro tip: Type \`${cfg.prefix}help\` to see a command list!!!**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.guild.systemChannel.send(embed)
    }
  }
  else{
    if (m.guild.id === "264445053596991498"){}
    else{
    let embed = new Discord.RichEmbed()
    .setDescription(`**Hello, ${m.user}! Welcome to \`${m.guild.name}\`!!! \nPro tip: Type \`${cfg.prefix}help\` to see a command list!!!**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.guild.systemChannel.send(embed)
    }
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`**Hello, ${m.user}! Welcome to \`${m.guild.name}\`!!! \nPro tip: Do not break rules)**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.user.send(embed2)
      
  }
  console.log(`[${Date()}] guildMemberAdd - User -- ${m.user.tag}; Server -- ${m.guild.name}`)
});

Client.on("guildMemberRemove", async m => {
  if(m.user.bot){
    if (m.guild.id === "264445053596991498"){}
    else{
    let embed = new Discord.RichEmbed()
    .setDescription(`**Bye-bye, ${m.user}! Thanks for having nice time on \`${m.guild.name}\`!!!**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.guild.systemChannel.send(embed)
    }
  }
  else{
    if (m.guild.id === "264445053596991498"){}
    else{
    let embed = new Discord.RichEmbed()
    .setDescription(`**Bye-bye, ${m.user}! Thanks for having nice time on \`${m.guild.name}\`!!!**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.guild.systemChannel.send(embed)
    }
    
    let embed2 = new Discord.RichEmbed()
    .setDescription(`**Bye-bye, ${m.user}! Thanks for having nice time on \`${m.guild.name}\`!!!**`)
    .setColor('#a200ff')
    .setAuthor(m.user.username, m.user.avatarURL)
    .setTimestamp()
    .setThumbnail(m.user.avatarURL)
    .setImage(m.guild.iconURL)
    
    m.user.send(embed2)
  }
  console.log(`[${Date()}] guildMemberRemove - User -- ${m.user.tag}; Server -- ${m.guild.name}`)
});

Client.on("message", async message =>{
    if (message.author.bot) return;
    if (message.author.id === null) return;
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
  
    let prefix;
    try{
      prefix = cfg[message.guild.id].prefix;
    }catch(err){
      prefix = "%";
      cfg[message.guild.id] = {
        prefix: "%"
      };
    }
  
    let coins = parseInt(await database.fetch(`coins_${message.author.id}`))
    if(coins === null){
      coins = 0;
      database.add(`coins_${message.author.id}`, 0)
    }
  
    let diamonds = parseInt(await database.fetch(`diamonds_${message.author.id}`))
    if(diamonds === null){
      diamonds = 1000;
      database.add(`diamonds_${message.author.id}`, 1000)
    }
    
    let bank = parseInt(await database.fetch(`bank_${message.author.id}`))
    if(bank === null){
      bank = 0;
      database.add(`bank_${message.author.id}`, 0)
    }
  
    let xp = await database.fetch(`xp_${message.guild.id}_${message.author.id}`)
    if(xp === null){
      xp = 0;
      database.add(`xp_${message.guild.id}_${message.author.id}`, 0)
    }
  
    let lvl = await database.fetch(`lvl_${message.guild.id}_${message.author.id}`)
    if(lvl === null){
      lvl = 0;
      database.add(`lvl_${message.guild.id}_${message.author.id}`, 0)
    }
  
    //xp system
    let pxp = Math.floor(Math.random() * 25) + 1;
  
    xp += pxp;
    if (xp >= 1000){
      xp -= 1000;
      lvl++;
      database.set(`lvl_${message.guild.id}_${message.author.id}`, lvl)
      database.set(`xp_${message.guild.id}_${message.author.id}`, xp)
      
      var lastone = lvl.toString().split('').pop();
      let lvtxt = ""
      if(lastone === "1") lvtxt = "st"
      else if(lastone === "2") lvtxt = "nd"
      else if(lastone === "3") lvtxt = "rd"
      else lvtxt = "th"
      
      let lvUpEmbed = new Discord.RichEmbed()
      .setColor(DCol)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle(`***Congratulations!!! You riched ${lvl}${lvtxt} level!!!***`)
      .setImage('https://cdn.glitch.com/7590bf34-fb34-4a0a-b182-0223f6ed7018%2Fpng-next-to-next-level-program-3171.png?v=1565535900394')
      
      message.channel.send(lvUpEmbed).then(m => {
        m.delete(5000);
      });
    }
    else{
      database.set(`xp_${message.guild.id}_${message.author.id}`, xp)
    }
    
  
    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let loliAmt = Math.floor(Math.random() * 15) + 1;
  
    if (coinAmt === loliAmt){
      database.set(`coins_${message.author.id}`, coins + coinAmt)
    }
    
  if(cmd.charAt(0) === prefix){
    let commandFile = Client.commands.get(cmd.slice(prefix.length))
    if(commandFile) commandFile.run(Client, message, args, prefix);
}
})

Client.login(token);








var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Dreams (dream TEXT)');
    //console.log('New table Dreams created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")');
    });
  }
  else {
    //console.log('Database "Dreams" ready to go!');
    db.each('SELECT * from Dreams', function(err, row) {
      if ( row ) {
        //console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Dreams', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  //console.log('Your app is listening on port ' + listener.address().port);
});