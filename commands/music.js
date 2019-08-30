const Discord = require("discord.js")
const ytdl = require("ytdl-core-discord")
const search = require('yt-search')
var validUrl = require('valid-url');

//music
var servers = {};

module.exports.run = async (_client, message, args, prefix) => {
  let cmd = args[0]
  
  if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: {
          url: [],
          title: [],
          timestamp: [],
          user: [],
          avatar: []
        },
    current: {
      url: "",
      title: "",
      timestamp: "",
      user: "",
      avatar: ""
    }
    };
  if(!servers[message.guild.id].queue) servers[message.guild.id] = {
    queue: {
      url: [],
      title: [],
      timestamp: [],
      user: [],
      avatar: []
    },
    current: {
      url: "",
      title: "",
      timestamp: "",
      user: "",
      avatar: ""
    }
  };
  if(!servers[message.guild.id].current) servers[message.guild.id] = {
    queue: {
      url: [],
      title: [],
      timestamp: [],
      user: [],
      avatar: []
    },
    current: {
      url: "",
      title: "",
      timestamp: "",
      user: "",
      avatar: ""
    }
  };
  
  if(cmd === 'play' || cmd === 'p'){  
    if (!args[1]) return message.channel.send("```Failture: Please provide YouTube link or title```");
    if (!message.member.voiceChannel) return message.channel.send("```Failture: Please connect to voice channel```");
  
    let url0 = args[1];
    let url = ""
    let name = ``;
    let time = ``;
    let server = servers[message.guild.id];

  if(!validUrl.isUri(url0)){
    search(args.join(" "), function(err, res) {
      if (err) {
         message.channel.send(`Something went wrong. Try again!`);
         return console.log(err);
      }

      let videos = res.videos.slice(0, 10);
      
      let txt = ""
      for(let i = 0; i < 10; i++){
        txt += `**__${i + 1}__** -- **${videos[i].timestamp}** -- \`${videos[i].title}\`\n`
      }
      
      let sEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(txt)
      .setColor("#a200ff")
      .setFooter('Write only number')
      .setTitle('**Choose one of this**')
      
      message.channel.send(sEmbed).then(r => r.delete(10000));
      
      const filter = m => /*!m.content.isNaN && m.content < videos.lenght + 1 && m.content > 0 &&*/ m.author.id === message.author.id; 
      message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
        //console.log(collected.first().content)
        if(collected.first().content === "cancel"){
          return message.channel.send("Canceled!");
        }
        else if (isNaN(collected.first().content) === false && collected.first().content <= 10 && collected.first().content > 0){
        
        name = [videos[parseInt(collected.first().content) - 1].title];
        time = [videos[parseInt(collected.first().content) - 1].timestamp];
        url = `https://www.youtube.com${[videos[parseInt(collected.first().content) - 1].url]}`
        //console.log(url)
        let server = servers[message.guild.id];
        if(server.queue.url[0] || message.guild.voiceConnection){
        let embed = new Discord.RichEmbed()
        .setColor("#a200ff")
        .setAuthor(`Added to queue: ${name} -- ${time}`, message.author.avatarURL)
        .setFooter(`Requsted by: ${message.author.username}`)
        .setTimestamp();

        message.channel.send(embed);
        }
          
        server.queue.url.push(url)
        server.queue.title.push(name)
        server.queue.timestamp.push(time)
        server.queue.user.push(message.author.username)
        server.queue.avatar.push(message.author.avatarURL)
          
        console.log(`[${Date()}] ${prefix}m play - User -- ${message.author.username}`)
        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        }).catch(err => console.log(err));
        }
      });
      });   
  }
  else {
    let server = servers[message.guild.id];
        if(server.queue.url[0] || message.guild.voiceConnection){
        let embed = new Discord.RichEmbed()
        .setColor("#a200ff")
        .setAuthor(`Added to queue!!!`, message.author.avatarURL)
        .setFooter(`Requsted by: ${message.author.username}`)
        .setTimestamp();
        message.channel.send(embed);
      }
        server.queue.url.push(url0)
        server.queue.title.push('none')
        server.queue.timestamp.push('none')
        server.queue.user.push(message.author.username)
        server.queue.avatar.push(message.author.avatarURL)
    
    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    });

    console.log(`[${Date()}] ${prefix}m play - User -- ${message.author.username}`)
  }
}
  else if(cmd === 'skip' || cmd === 's'){
    var server = servers[message.guild.id];
    
    if (server.dispatcher) server.dispatcher.end();
    
    if (message.guild.voiceConnection){
      let skipEmbed = new Discord.RichEmbed()
      .setAuthor('Skipped', message.author.avatarURL)
      .setColor("#a200ff")
      .setTimestamp()
      message.channel.send(skipEmbed)
    }
    
    console.log(`[${Date()}] ${prefix}m skip - User -- ${message.author.username}`)
  }
  else if (cmd === 'stop'){
    var server = servers[message.guild.id];

    if (message.guild.voiceConnection){
      message.guild.voiceConnection.disconnect();
      let stopEmbed = new Discord.RichEmbed()
      .setAuthor('Stopped', message.author.avatarURL)
      .setColor("#a200ff")
      .setTimestamp()
      message.channel.send(stopEmbed)
    }
    servers[message.guild.id] = {};
    

    console.log(`[${Date()}] ${prefix}m stop - User -- ${message.author.username}`)
  }
  else if (cmd === 'queue' || cmd === 'q'){
    var server = servers[message.guild.id];
    let url = server.queue.url;
    let timestamp = server.queue.timestamp;
    let title = server.queue.title;
    let user = server.queue.user;
    //console.log(url.length)
    
    let list = ""
    if (message.guild.voiceConnection){
      if(server.current.title === 'none' && server.current.timestamp === 'none')
        list += `__Playing -- \`${server.current.url}\` -- \`${server.current.user}\`__\n\n`
      else
        list += `***__Playing -- ${server.current.timestamp} -- \`${server.current.title}\`*** -- \`${server.current.user}\`__\n\n`
    }
    
    for(let i = 0; i < url.length; i++){
      if(server.queue.title[i] === 'none' && server.queue.timestamp[i] === 'none'){
        list += `**__${i+1}__ -- \`${url[i]}\`** -- \`${user[i]}\`\n`
      }
      else{
        list += `**__${i+1}__ -- __${timestamp[i]}__ -- \`${title[i]}\`** -- \`${user[i]}\`\n`
      }
    }
    let embed = new Discord.RichEmbed()
    .setDescription(list)
    .setColor("#a200ff")
    .setTimestamp()
    
    if(list !== "")
    message.channel.send(embed)
    
    console.log(`[${Date()}] ${prefix}m queue - User -- ${message.author.username}`) 
  }
  else if(cmd === 'pause'){
    if(message.guild.voiceConnection) {
        pause(servers[message.guild.id].current, message, 0);
    }
  }
  else if(cmd === 'resume'){
    if(message.guild.voiceConnection) {
        pause(servers[message.guild.id].current, message, 1);
    }
  }
}

async function play(connection, message){
    let server = servers[message.guild.id];
    //console.log('play()')
    if(server.queue.title[0] === 'none' && server.queue.timestamp[0] === 'none'){
       let embed = new Discord.RichEmbed()
      .setAuthor(`Playing: ${server.queue.url[0]}`, server.queue.avatar[0])
      .setFooter(`Requsted by: ${server.queue.user[0]}`)
      .setColor("#a200ff")
    
      message.channel.send(embed)
    }
  else{
    let embed = new Discord.RichEmbed()
    .setAuthor(`Playing: ${server.queue.title[0]} -- ${server.queue.timestamp[0]}`, server.queue.avatar[0])
    .setFooter(`Requsted by: ${server.queue.user[0]}`)
    .setColor("#a200ff")
    
    message.channel.send(embed)
    }
    //console.log('server.dispatcher = connection.playOpusStream(ytdl(server.queue.url[0].toString(), {filter: "audioonly"}));')
    server.dispatcher = connection.playOpusStream(await ytdl(server.queue.url[0].toString(), {filter: "audioonly"}));
  
    server.current.url = server.queue.url[0];
    server.current.title = server.queue.title[0];
    server.current.timestamp = server.queue.timestamp[0];
    server.current.user = server.queue.user[0];
    server.current.avatar = server.queue.avatar[0];
  
    server.queue.url.shift();
    server.queue.title.shift();
    server.queue.timestamp.shift();
    server.queue.user.shift();
    server.queue.avatar.shift();
  
    
  
    server.dispatcher.on("end", function(){
        //console.log('disconnected')
        if (server.queue.url[0]) play(connection, message);
        else connection.disconnect();
    });
}

function pause(queue, message, arg){
  let server = servers[message.guild.id];
  
  if (arg === 0){
    server.dispatcher.pause()
    
    let embed = new Discord.RichEmbed()
    .setAuthor(`__Paused__: ${queue.title} -- ${queue.timestamp}`, queue.avatar)
    .setFooter(`Requsted by: ${queue.user}`)
    .setColor("#a200ff")
    .setTimestamp()
    
    message.channel.send(embed)
  }
  else if(arg === 1){
    server.dispatcher.resume();
    
    let embed = new Discord.RichEmbed()
    .setAuthor(`__Resumed__!!! Playing: ${queue.title} -- ${queue.timestamp}`, queue.avatar)
    .setFooter(`Requsted by: ${queue.user}`)
    .setColor("#a200ff")
    .setTimestamp()
    
    message.channel.send(embed)
  }
}

module.exports.info = {
    name: "m"
}