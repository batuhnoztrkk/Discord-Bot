const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
exports.run = async (client, message, args, reaction) => { //835083307434770432

    if(message.member.id === '278229385721675777' || message.member.id === '184365222734069760' || message.member.id === '568385647220490242'){

      /*if(!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Acil durum botta bulunan tüm komutları sunucuda bulunan TÜM kullanıcılar için deaktif eder.\n\n Bu sayede botta bulunan komutların hepsi kimse tarafından kullanılamaz hale getirilir.\n\n Örnek kullanım: **.alert aç || kapat**`)
        return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
      }*/

      if(args[0]=="registeraç") {
        db.set("modKontrol_" + message.guild.id, "Kapalı");
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Acil Durum modu aktif edildi. Botta bulunan hiçbir komut kullanılamayacaktır.`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
      }

      if(args[0]=="registerkapat") {
        db.set("modKontrol_" + message.guild.id, "Açık");
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Acil Durum modu deaktif edildi. Botta bulunan komutlar kullanılabilir hale getirildi.`)
          return message.channel.send({embed}).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 10000 }));
      }
  }

  else{
    return message.channel.send("Okayyy!").then(msg => msg.delete({ timeout: 500 }) && message.delete({ timeout: 500 }));
  }

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['alert'],
  permLevel: 0
};
exports.help = {
  name: 'acildurum',
  description: '',
  usage: 'kayıt'
};
