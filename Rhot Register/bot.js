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


const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', async () => {
  // "ready" isn't really ready. We need to wait a spell.
  await wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on("guildMemberAdd", member => {
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = client.users.cache.get(invite.inviter.id);
    var check = db.fetch(`inviteCheck_${member.user.id}`)
    //console.log(check)
    if(!check){
      db.add(`invite_${inviter.id}`, 1);
    }
    db.set(`inviteCheck_${member.user.id}`, `${inviter.id} ${invite.code}`);

    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.cache.get("845704382221647924");
    // A real basic message with the information we need. 
    logChannel.send(`\`${member.user.tag}\`, \`${invite.code}\` invite kodu ile \`${inviter.tag}\` tarafından davet edildi. Davet kodu oluşturulduğundan beri \`${invite.uses}\` kez kullanıldı.`);
  });
});


const Activites = new Map();

client.on('voiceStateUpdate', (oldState, newState) => {
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) {
    Activites.set(oldState.id, Date.now());
  }
      let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data);
    } else data = Activites.get(oldState.id);

    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) {
        Activites.delete(oldState.id);
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        //db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    } else if(oldState.channelID && newState.channelID){
        Activites.set(oldState.id, Date.now());
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        //db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    }
})
const Activitess = new Map();
client.on('voiceStateUpdate', (oldState, newState) => {
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) {
    Activitess.set(oldState.id, Date.now());
  }
      let data;
    if(!Activitess.has(oldState.id)){
        data = Date.now();
        Activitess.set(oldState.id, data);
    } else data = Activitess.get(oldState.id);

    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) {
      Activitess.delete(oldState.id);
        let kanal = oldState.guild.channels.cache.get(oldState.channelID)
        db.add(`voiceData.${oldState.id}.parentID.${kanal.parentID}`, duration);
        //db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    } else if(oldState.channelID && newState.channelID){
      Activitess.set(oldState.id, Date.now());
        let kanal = oldState.guild.channels.cache.get(oldState.channelID)
        db.add(`voiceData.${oldState.id}.parentID.${kanal.parentID}`, duration);
        //db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    }
})


//Sunucu ses girme....
client.on("ready", () => {
  client.channels.cache.get("843859869861806100").join();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let kontrol = newState.id
  if(kontrol === "843508840313782272"){
    client.channels.cache.get("843859869861806100").join();
  }
})
//                 //                  //// HOŞGELDİN //                  ////                 //                  ////


client.on("guildMemberAdd", async member => {
  member.roles.add('835082233857572874');
  member.roles.add('835082161836130354');
    var kanal = await db.fetch("hgbbKanal_" + member.guild.id)
    if(!kanal) return
    let count = member.guild.members.cache.filter(a=>a.user.bot == false).size
      let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    let kurulus = new Date().getTime() - user.createdAt.getTime();
    var kontrol;
if (kurulus < 1296000000) kontrol = 'Bu Hesap Güvenilir Değil'
if (kurulus > 1296000000) kontrol = 'Bu Hesap Güvenilir Gözüküyor'
  moment.locale("tr");
  const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Rhot sınırlarına giriş sağlandı!")
      .setDescription(`**
        • ${member} ile birlikte \`${count}\` kişi Rhot'ın aktif nüfusunu oluşturmakta.
         **`)
      .addField(`Hesap durumu`,`\`${kontrol}\``,true)
      .addField(`Hesabın oluşturulma tarihi`,`${moment(member.user.createdAt).format(`\`YYYY DD MMMM dddd (hh:mm:ss)\``)}`,true)
      client.channels.cache.get(kanal).send({embed});
  })
  /*client.on("message", async message => {
    if(message.content === "asd")
    var kayıtlımı = db.fetch(`kayıtData_${message.member.id}_${message.guild.id}`);
    var sonuc1 = kayıtlımı.split(" ");
    var ilk = sonuc1[0]
    var ikinci = sonuc1[1]
    var ücüncü = sonuc1[2]
      message.channel.send(ilk + ikinci + ücüncü)
  });*/

  /*client.on("guildMemberRemove", async member => {
    console.log(member)
      var kanal = await db.fetch("hgbbKanal_" + member.guild.id)
      if(!kanal) return
      let count = member.guild.members.cache.filter(a=>a.user.bot == false).size
        let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      let kurulus = new Date().getTime() - user.createdAt.getTime();
      var kontrol;
  if (kurulus < 1296000000) kontrol = '**__Bu Hesap Güvenilir Değil__**'
  if (kurulus > 1296000000) kontrol = '**__Bu Hesap Güvenilir Gözüküyor__**'
    moment.locale("tr");
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("GÖRÜŞÜRÜZ")
        .setDescription(`**• ${member.user.tag}** aramızdan ayrıldı.`)
        .setTimestamp()
        .setFooter(`${client.user.username} Hoşgeldin / Görüşürüz Sistemi.`,member.guild.iconURL({ dynamic: true }))
        .setImage("https://media.giphy.com/media/3GOLtCgq4SfD2/giphy.gif")
        client.channels.cache.get(kanal).send({embed});
    })*/
//                 //                  //// HOŞGELDİN //                  ////                 //                  ////



client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  let tag = "Δ"; ///////tag girin
  let sunucu = "833069798061244426"; ///////sunucunuzun id
  let kanal = "835628120550801479" ///////log tutulcak kanal id
  let rol = "835622165164326933"; /////tag aldımı verilmesini istediğiniz rol id
  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  client.channels.cache.get(kanal).send(`**${newUser} | \`${newUser.id}\` | adlı kişi ${tag} tagımızı aldığı için <@&${rol}> rolü verildi !**`)
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol) 
}

if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.includes(tag)) {
  var kayıtlımı = db.fetch(`kayıtData_${newUser.id}_833069798061244426`);
  var sonuc1 = kayıtlımı.split(" ");
  var ilk = sonuc1[0]
  var ikinci = sonuc1[1]
  var ücüncü = sonuc1[2]
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname(`Δ ${ilk} | ${ücüncü}`)
}
if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).nickname.includes(tag)) {
  var kayıtlımı = db.fetch(`kayıtData_${newUser.id}_833069798061244426`);
  var sonuc1 = kayıtlımı.split(" ");
  var ilk = sonuc1[0]
  var ikinci = sonuc1[1]
  var ücüncü = sonuc1[2]
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).setNickname(`▼ ${ilk} | ${ücüncü}`)
}



  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083307434770432')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623403330732073')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623356887597107')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620400288497705')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835620288955547732')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623327044993085')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623282106433546')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083522170421269')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835623076942446622')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622904967331911')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835622812780986408')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621485082050590')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621420703809577')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835621420703809577')
  client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove('835083580278308884')
  
  client.channels.cache.get(kanal).send(`**${newUser} | \`${newUser.id}\` | adlı kişi ${tag} tagımızı çıkardığı için <@&${rol}> rolü ve tüm yetkili rolleri alındı !**`) } } 

})
  
  
  
  client.on("guildMemberAdd", member => {
    let tag = "Δ"; ///////tag girin
    let sunucu = "833069798061244426"; ///////sunucunuzun id
    let kanal = "835628120550801479" ///////log tutulcak kanal id
    let rol = "835622165164326933"; /////tag aldımı verilmesini istediğiniz rol id
  
  if(member.user.username.includes("Δ")){
  member.roles.add("835622165164326933")
  client.channels.cache.get(kanal).send(`**${member} | \`${member.id}\` | adlı kişi ${tag} tagı olduğu için <@&${rol}> rolü verildi !**`)
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
