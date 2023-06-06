const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
const moment = require('moment')
exports.run = async (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
  || message.member.roles.cache.get('835619974025576490')){
    {
         let reason = args.slice(1).join(' ')

    if (!args[0]){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Banlayacağınız kişinin idsini girmeniz gerek. Örnek kullanım : **.oban id <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    //let user = message.mentions.users.first() ||  message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
    let muted = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (muted){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`İd'si girilen kişi sunucuda mevcut. Online banı deneyin!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(!reason){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Lütfen sebep belirtiniz. Örnek kullanım : **.oban id <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    let member = message.guild.member(muted)
    if (member){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`İd'si girilen kişi sunucuda mevcut. Online banı deneyin!`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    var kontrol = db.fetch(`oban_${message.guild.id}`);

    if(kontrol){
      if(kontrol.includes(args[0])){
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Bu kişi zaten offline ban listedinde bulunuyor.`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }
      var dizi = `${kontrol}, ${args[0]}`;
      db.set(`oban_${message.guild.id}`, dizi);
    }
    else{
      db.set(`oban_${message.guild.id}`, args[0]);
    }


    var veri = db.fetch(`sicil_${args[0]}`);
    if(!veri){
      db.set(`sicil_${args[0]}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${reason}\` Sebebiyle **Offline Banlandı.**`);
    }
    var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${reason}\` Sebebiyle **Offline Banlandı.** \n\n${veri}`]
    db.set(`sicil_${args[0]}`,`${yardımcıdizi}`);

    const embed = new Discord.MessageEmbed()
      .setAuthor(`BANNED FROM ${message.guild.name}`)
      .setColor('0x2f3136')
      .addField(`**Yasaklayan**`,`<@${message.author.id}>`, true)
      .addField(`**Yasaklanan**`,`<@${args[0]}> \`${args[0]}}\``, true)
      .addField(`Sebep`,`${reason}`, true)
      message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));

      const unban = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setTitle("OFFLİNE BAN")
      .setThumbnail(message.author.avatarURL())
      .setDescription(`**• Ban atan yetkili :**${message.member} \n**• Banlanan Kullanıcı :**<@${args[0]}> \`${args[0]}}\``)
      var data = '835978919999570020';
      message.client.channels.cache.get(data).send(unban);
      }



  }

  else {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }

 }
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['oban'],
   permLevel: 4
 };
 exports.help = {
   name: 'offlineban',
   description: '',
   usage: 'offlineban'
 };
