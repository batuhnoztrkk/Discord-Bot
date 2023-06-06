const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("wio.db");
//const dbs = require('quick.db')
require('./util/eventLoader')(client);
const fynx = require("./ayarlar.json");
const { Player } = require("discord-player");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const ms = require("parse-ms");

const player = new Player(client);
client.player = player;


const { Client, MessageEmbed } = require('discord.js');


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

/*setInterval(() => {
  var zaman = moment().format('MMMM Do YYYY, h:mm:ss a');
  client.channels.cache.get("844567244565643264").send(`Rhot Guard Otomatik restart: ${zaman}`).then(msg => {  
    console.log(`Otomatik restart: ${zaman}`)
    process.exit(0);
  })
  }, 7200000)*/


  client.on("guildMemberAdd", member => {
    if(member.user.bot){
      let izinKontrol = db.fetch(`izin_${member.id}`);
      if(izinKontrol == "1"){
        db.delete(`izin_${member.id}`);
        return kanal.send(`\`${member.id}\` Idli bot izinli olarak sunucuya eklendi.`);
      }
      else{
        const kanal = member.guild.channels.cache.get('853011392835616828');
        //member.guild.channels.cache.get("838033975582261269").send("oldu");
        member.ban({reason : "Anti Raid"}); //853011392835616828
        kanal.send(`Sunucuya izinsiz bot eklenmek istendi ve banlandı.\n ${member.user.username} adlı botun sunucuya giriş iznini vermek için: **.izin \`${member.id}\`**.\n Bu komutu kullanabilecek idler: \`184365222734069760\`, \`278229385721675777\`, \`568385647220490242\`.`);
      }
    }
  });


client.on("message", async message => {

    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    const müzik = [".play", "!play"]
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      if(müzik.some(word => message.content.toLowerCase().includes(word))){return}
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();

          const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Bu sunucuda reklam yapmak yasaktır!`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }));

        }
      } catch(err) {
        console.log(err);
    }
  }
});
client.on("messageUpdate", async (oldMessage,newMessage) => {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => newMessage.content.toLowerCase().includes(word))) {
      try {
        if (!newMessage.member.permissions.has('KICK_MEMBERS')) {
          newMessage.delete();

          const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Bu sunucuda reklam yapmak yasaktır! ||Mesajını düzenlemen bir şey farketmez!||`)
          return newMessage.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }));

        }
      } catch(err) {
        console.log(err);
    }
  }
});


//Sunucu ses girme....
client.on("ready", () => {
  client.channels.cache.get("843859869861806100").join();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let kontrol = newState.id
  if(kontrol === "843508230525419521"){
    client.channels.cache.get("843859869861806100").join();
  }
})





client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
