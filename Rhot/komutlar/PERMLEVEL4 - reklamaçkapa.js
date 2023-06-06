const Discord = require('discord.js')
const db = require('wio.db')

exports.run = async (client ,message, args) =>{
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {return message.channel.send("Bu komut yetkili tarafından bu sunucuda kapatılmıştır.")}
if(args[0] === 'aktif' || args[0] === 'Aktif') {
    db.set(`reklamFiltre_${message.guild.id}`, true)
    message.channel.send('Başarılı Şekilde `Aktif` Edildi.')
    const unban = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle("REKLAM ENGEL")
    .setThumbnail(message.author.avatarURL())
    .setDescription(`**• Komutu kullanan yetkili : ${message.member} \n• Reklam engel durumu : Açık**`)
    .setTimestamp()
    .setFooter(`${client.user.username} Reklam engel sistemi.`,message.guild.iconURL({dynamic:true}))
    var data = await db.fetch("logKanal_" + message.guild.id)
    return  message.client.channels.cache.get(data).send(unban);
}
if (args[0] === 'deaktif' && args[0] === 'deaktif') {
  db.set(`reklamFiltre_${message.guild.id}`, false)
message.channel.send('Başarılı Şekilde `Deaktif` Edildi')
const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("REKLAM ENGEL")
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Komutu kullanan yetkili : ${message.member} \n• Reklam engel durumu : Kapalı**`)
.setTimestamp()
.setFooter(`${client.user.username} Reklam engel sistemi.`,message.guild.iconURL({dynamic:true}))
var data = await db.fetch("logKanal_" + message.guild.id)
return  message.client.channels.cache.get(data).send(unban);
}
  message.channel.send('Lüten `Aktif` yada `Deaktif` Yazın!')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['Reklamengel'],
 permLevel: 4
};

exports.help = {
 name: 'reklamengel',
 description: 'Davet Log Kanalını Belirler',
 usage: 'davet-kanal-ayarla #kanal'
};
