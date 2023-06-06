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
if(!args[0])
{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Lütfen Silinicek Mesaj Miktarını Yazın! Tek seferde en fazla 100 mesaj silinebilir.`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

if(args[0] > 100)
{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Tek seferde en fazla **100** mesaj silinebilir.`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(
    new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${args[0]} Adet Mesajı Sildim .`)).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
})


const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("Mesaj Silindi")
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Mesaj silen yetkili**: ${message.member} \n**• Sildiği mesaj sayısı:** ${args[0]} \n• **Mesaj sildiği kanal:** #${message.channel.name}`)
.setTimestamp()
.setFooter(`${client.user.username} Sil sistemi.`,message.guild.iconURL({dynamic:true}))
var data = await db.fetch("logKanal_" + message.guild.id)
message.client.channels.cache.get('835628158967218196').send(unban);
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
  aliases: ['Sil', 'clear'],
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
