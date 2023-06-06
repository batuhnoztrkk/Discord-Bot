const Discord = require('discord.js');
const moment = require('moment')
const talkedRecently = new Set();
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;
const db = require("wio.db");
const { Client, MessageEmbed } = require('discord.js');
exports.run = async (bot, message, args, client) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

//if(!message.member.hasPermission("ayarlar.BanYetkilisi")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok! Hata olduğunu düşünüyorsan ban-yetkili komutunu deniyebilirsin.");
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＹＥＴＫＩ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

if(message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490')){

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＬＯＧ ＡＹＡＲＬＡＭＡ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

/*const kanal = message.guild.channels.find(banlog => banlog.id === "779757705333440572")
const save = message.guild.channels.find(banlog => banlog.id === "779757705333440572")*/


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＤＯＫＵＮＭＡ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

   let reason = args.slice(1).join(' ')
    if (!args[0]){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Kickleyeceğiniz kişiyi etiketlemediniz. Örnek kullanım : **.kick @user <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user;
    let muted = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]).user);
    if (!user){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Etiketlenen Kişi Sunucuda Bulamadım. Örnek kullanım : **.kick @user <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if(!reason){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Lütfen sebep belirtiniz. Örnek kullanım : **.kick @user <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }

    let member = message.guild.member(user)
    if (!member){
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Etiketlenen Kişi Sunucuda Bulamadım. Örnek kullanım : **.kick @user <Sebep>**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
    if (muted.roles.highest.position >= message.member.roles.highest.position){
      const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Bu kişiyi sunucudan atamam.`)
      return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
    }
  //  message.member.send(`${message.guild.name} (${message.guild.id}) Sunucusundan ${message.author} (${message.author.id}) Tarafından ${reason} Sebebiyle Yasaklandın.`)
  var veri = db.fetch(`sicil_${member.id}`);
  if(!veri){
    db.set(`sicil_${member.id}`,`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${reason}\` Sebebiyle **Kicklendi.**`);
  }
  var yardımcıdizi = [`• \`${moment().format('MMMM Do YYYY, h:mm:ss a')}\` Tarihinde <@${message.author.id}> (\`${message.author.id}\`) Tarafından \`${reason}\` Sebebiyle **Kicklendi.** \n\n${veri}`]
  db.set(`sicil_${member.id}`,`${yardımcıdizi}`);

        member.kick({reason: reason});

          const embed = new Discord.MessageEmbed()
            .setColor('0x2f3136')
            .addField(`**Kickleyen**`,`<@${message.author.id}>`, true)
            .addField(`**Kicklenen**`,`<@${member.id}> \`${member.id}}\``, true)
            .addField(`**Sebep**`,`${reason}`, true)
            message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＭＥＴＩＮＬＥＲ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("KİCK")
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Kick atan yetkili : ${message.member} \n• Kicklenen Kullanıcı : <@${member.id}>  \`${member.id}}\`**`)
var data = '838051027948797952';
message.client.channels.cache.get(data).send(unban);


//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆ＥＸＴＲＡ ＬＯＧ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

/*        const savelog = new Discord.RichEmbed()
.setAuthor(message.author.username, message.author.avatarURL)
.setColor(`GREEN`)
  .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
• Banlanan Kullanıcı: ${user} | \`${user.id}\`
• Sebebi: \`${reason}\`
• Kanal: \`${message.channel.name}\`
`)
.setTimestamp()
save.send(savelog)*/
}

else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}


}

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Etiketlediğiniz kişiyi sebebi ile sunucudan banlar.',
	usage: 'ban kişi sebep',
};
