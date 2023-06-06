const Discord = require('discord.js');
const db = require("wio.db");
const { Client, MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

if(message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269') || message.member.roles.cache.get('835083580278308884')
|| message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911') || message.member.roles.cache.get('835622812780986408')
|| message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577') || message.member.roles.cache.get('835619799441866822')
|| message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462') || message.member.roles.cache.get('835620892033417259')
|| message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436') || message.member.roles.cache.get('835619974025576490')
)
{
  let invites = await message.guild.fetchInvites().catch(error => {
      return message.channel.send(
        "❌ | Davetleri Göremiyorum! Yeterli Yetkim Yok!"
      );
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
      possibleinvites.push(
        `🚩| ${invites.inviter.username} | Davet: ${invites.uses}`
      );
    });

    const embed = new Discord.MessageEmbed()
      .setTitle(`**SUNUCU DAVET BİLGİLERİ**`)
      .setColor("RANDOM")
      .addField("Davet Bilgileri", `**${possibleinvites.join("\n")}**`)
      .setTimestamp()
      .setFooter(`Komutu Kullanan: ${message.author.username}`);
    message.channel.send(embed);
}

else{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin İzniniz Yok!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['davetsıra'],
  permLevel: 0
};

exports.help = {
  name: 'dsıra',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
