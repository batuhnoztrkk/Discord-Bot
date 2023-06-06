const Discord = require("discord.js");
const ms = require("ms");
const db = require("wio.db");
const moment = require('moment');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  //moment.locale(tr);

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

var datas = await db.fetch("muteYetkili_" + message.guild.id)
var mutelirol = db.fetch("jailRol_" + message.guild.id)

if(message.member.roles.cache.get('835083522170421269')
|| message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
|| message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
|| message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490'))
{
  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);
  if(!kişi) {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Jail'den çıkartmak istediğin kişiyi etiketlemen gerek. **.unjail <@kişi>**`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
  }
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

        let mutezaman = args[0]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

    db.delete(`jailsüre_${kişi.id + message.guild.id}`)
    db.delete(`jail_${message.guild.id + kişi.id}`)
    db.add(`unjailcezayazı_${message.guild.id + kişi.id}`,1)
    /*var veri = db.fetch(`sicil_${kişi.id}`);
    if(!veri){
      db.set(`sicil_${kişi.id}`,`\`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından **UnJail.**`);
    }
    var yardımcıdizi = [`\`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından **UnJail.** \n${veri}`]
    db.set(`sicil_${kişi.id}`,`${yardımcıdizi}`);*/

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
            var datass = await db.fetch("jailRol_" + message.guild.id)
            kişi.roles.remove(datass);
            kişi.roles.add("835082233857572874");
            kişi.roles.add("835082161836130354");

            message.channel.send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
              .setColor(`PURPLE`)
              .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
            • Jailden çıkarılan Kullanıcı: <@${kişi.id}> | \`${kişi.id}\`
            • Kanal: \`${message.channel.name}\``)
).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));


            const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setColor(`PURPLE`)
  .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
• Jailden çıkarılan Kullanıcı: <@${kişi.id}> | \`${kişi.id}\`
• Kanal: \`${message.channel.name}\``)
            var datak = await db.fetch("logKanal_" + message.guild.id)
client.channels.cache.get('835971863024500767').send(embed)

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\





}

else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uj'],
  permLevel: 0
};

exports.help = {
  name: 'unjail',
  description: 'Muteyi kaldırır. Kullanım: .unmute <@kişi>',
  usage: 'unmute [prefix]'
};
