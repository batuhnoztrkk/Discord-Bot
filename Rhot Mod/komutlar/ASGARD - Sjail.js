const Discord = require("discord.js");
const ms = require("ms");
const db = require("wio.db");
const moment = require('moment')
const momentt = require("moment-duration-format")

const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
  var datas = await db.fetch("muteYetkili_" + message.guild.id)
  var mutelirol = await db.fetch("jailRol_" + message.guild.id)

  if(message.member.roles.cache.get('835083522170421269')
|| message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
|| message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
|| message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490'))
  {
    if(!args[0]){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Kişiyi belirtmelisiniz. Örnek kullanım: .jail <@kişi> <süre> <Sebep>`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);

    let muted = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);
    if (!muted) {   const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Jail Atmam Gereken Kişiyi Belirt. **.jail <@kişi> <süre> <Sebep>**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   } else {
      if (muted.roles.highest.position >= message.member.roles.highest.position)
      {
        const embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`)
         return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      } else {
          if(!args[1]){
            const embed = new Discord.MessageEmbed()
           .setColor("RED")
           .setDescription(`Süre belirtmelisiniz. Örnek kullanım: .jail <@kişi> <süre> <Sebep>`)
           return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));}
        let mutezaman = args[1]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
        if (!mutezaman) {
          const embed = new Discord.MessageEmbed()
         .setColor("RED")
         .setDescription(`Geçerli süre girmediniz. Örnek kullanım: .jail <@kişi> <süre> <Sebep>`)
         return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
        } else {
          let sebep = args.slice(2).join(' ');
          if(!args[2]) {
            const embed = new Discord.MessageEmbed()
           .setColor("RED")
           .setDescription(`Sebep girmediniz. Örnek kullanım: .jail <@kişi> <süre> <Sebep>`)
           return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
          }


          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");



var veri = db.fetch(`sicil_${kişi.id}`);
if(!veri){
  db.set(`sicil_${kişi.id}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` **Jail.**`);
}
var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${sebep}\` Sebebiyle \`${vakit}\` **Jail.** \n\n${veri}`]
db.set(`sicil_${kişi.id}`,`${yardımcıdizi}`);


  db.add(`jailceza_${message.guild.id + kişi.id}`,1)
db.set(`jail_${message.guild.id + kişi.id}`, 'jailli')
db.set(`jailsüre_${kişi.id + message.guild.id}`, mutezaman)

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

          try {

            message.channel.send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye jaillendi.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``)
).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
            var log = await db.fetch("logKanal_" + message.guild.id)
            message.client.channels.cache.get('835971863024500767').send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye jaillendi.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``)
            );

            var roller = await db.fetch("jailRol_" + message.guild.id)
            var datass = message.guild.roles.cache.find(r => r.id === roller);
            muted.roles.set([datass]);
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

          } catch (e) {
            console.log(e);
          }

          setTimeout(async function() {
            db.delete(`jailsüre_${kişi.id + message.guild.id}`);
            db.delete(`jail_${message.guild.id + kişi.id}`);
            var datass = await db.fetch("jailRol_" + message.guild.id)
            var datak = await db.fetch("logKanal_" + message.guild.id)
            muted.roles.remove(
              datass,

              message.client.channels.cache.get('835971863024500767').send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
              .setColor('#494459')
              .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üyesinin jaili sonlandı.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``))


            );
            muted.roles.add("835082233857572874");
            muted.roles.add("835082161836130354");
          }, ms(mutezaman));
        //
      }

    }

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
    aliases: ['j'],
    permLevel: 0
  };

  exports.help = {
    name: 'jail',
    description: 'Kullanıcıyı muteler. Kullanım: .mute <@kişi> <süre> <Sebep>',
    usage: 'mute [prefix]'
  };
