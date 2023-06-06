const Discord = require("discord.js");
const db = require("wio.db");
exports.run = async (client, message, args) => {
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436') || message.member.roles.cache.get('835619974025576490'))
  {
if(!args[0]) {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Sohbet kanalında yazılabilirlik durumunu açmak||kapamak için: **.sohbet aç|kapat**`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

  if(args[0] === 'aç' || args[0] === 'Aç' || args[0] === 'ac' || args[0] === 'Ac') {
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
 message.channel.updateOverwrite(every, {
    SEND_MESSAGES: null
  });

  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`Sohbet kanalı \`Yazılır\` durumuna getirildi.`)
  message.channel.send({embed}).then(msg => msg.delete({ timeout: 20000 }) && message.delete({ timeout: 20000 }));

  const unban = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle("SOHBET AÇ/KAPAT")
  .setThumbnail(message.author.avatarURL())
  .setDescription(`**• Komutu kullanan yetkili : ${message.member} \n• Sohbet durumu : Açık**`)
  var data = await db.fetch("logKanal_" + message.guild.id)
  return  message.client.channels.cache.get('835628158967218196').send(unban);

}

if(args[0] === 'kapa' || args[0] === 'Kapa' || args[0] === 'kapat' || args[0] === 'Kapat') {
  let every = message.guild.roles.cache.find(r => r.name === "@everyone");
message.channel.updateOverwrite(every, {
  SEND_MESSAGES: false
});

const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`Sohbet kanalı \`Yazılamaz\` durumuna getirildi.`)
message.channel.send({embed}).then(msg => msg.delete({ timeout: 20000 }) && message.delete({ timeout: 20000 }));

const unban = new Discord.MessageEmbed()
.setColor('BLACK')
.setTitle("SOHBET AÇ/KAPAT")
.setThumbnail(message.author.avatarURL())
.setDescription(`**• Komutu kullanan yetkili : ${message.member} \n• Sohbet durumu : Kapalı**`)
var data = await db.fetch("logKanal_" + message.guild.id)
return  message.client.channels.cache.get('835628158967218196').send(unban);

}
}

else{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Sohbet'],
  permLevel: 3
};

exports.help = {
  name: "sohbet",
  description: "Sohbetinizi kapatmaya yarar.",
  usage: "kapat"
};
