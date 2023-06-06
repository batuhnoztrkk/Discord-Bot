const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const db = require("wio.db");

module.exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }
  
  /*var data = await db.fetch("banyetkili_" + message.guild.id)
  if(!data) return message.channel.send(`Ban yetkilisi ayarlanmamış. Birini banlamak için ban yetkilisini ayarlaman gerek. Kullanım : .Ban-yetkili`)
 if(!message.member.roles.cache.get(data))
 return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.(Hata olduğunu düşünüyorsan **BAN** yetkilisini ayarla. Örnek kullanım : .ban-yetkili <banyetkilisi id>)')*/

if(message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490')){
let unbanid = args[0]
if(!unbanid){
  const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Banını kaldırmak istediğin kişinin id sini yazmalısın. **.unban @id**`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}



message.guild.members.unban(unbanid)
const unban2 = new Discord.MessageEmbed()
.setColor('GREEN')
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Banı Kaldıran Yetkili :** ${message.member} \n**• Banı Kaldırılan Kullanıcı :** <@${unbanid}> \`${unbanid}\``)
  message.channel.send(unban2).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));


const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("UNBAN")
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Banı Kaldıran Yetkili :** ${message.member} \n**• Banı Kaldırılan Kullanıcı :** <@${unbanid}> \`${unbanid}\``)
var data = '835978919999570020';
message.client.channels.cache.get(data).send(unban);
}
else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}


};
exports.conf = {
enabled:true,
guildOnly: true,
aliases: ['Unban'],
permlevel: 2
};
exports.help = {
name: "unban",
description: "Herhangi bir kullanıcının banını açarsınız.",
usage: "unban kullanıcı"
};
