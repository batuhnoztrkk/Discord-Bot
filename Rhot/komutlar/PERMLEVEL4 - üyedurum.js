const Discord = require("discord.js");
const db = require('wio.db')
exports.run = async (client, message) => {
  var kontrol = db.fetch("kullanıcıKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {return message.channel.send("Bu komut yetkili tarafından bu sunucuda kapatılmıştır.")}
  let üye = new Discord.MessageEmbed()
    .setAuthor("Üye durum")
    .setColor("RED")
   .addField("**Toplam Kullanıcı**",message.guild.memberCount,true)
    .addField("**Çevrimiçi Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'online').size,true)
  .addField("**Boşta Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'idle').size,true)
.addField("**Rahatsız Etmeyindeki Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'dnd').size,true)
.addField("**Çevrimdışı Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'offline').size)
  .setFooter(`${client.user.username} Üye Durum Sistemi.`,message.guild.iconURL({dynamic:true}))
    .setTimestamp()
   message.channel.send(üye);

  const unban = new Discord.MessageEmbed()
  .setColor('BLACK')
  .setTitle("ÜYE DURUM")
  .setThumbnail(message.author.avatarURL())
  .setDescription(`**• Sorgulatan kullanıcı : ${message.member}**`)
  .setTimestamp()
  .setFooter(`${client.user.username} Üye Durum Sistemi.`,message.guild.iconURL({dynamic:true}))
  var data = await db.fetch("logKanal_" + message.guild.id)
return  message.client.channels.cache.get(data).send(unban);
};

module.exports.conf = {
  aliases: ["Üyedurum"],
  permLevel: 4,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "üyedurum",
  description: "",
  usage: ""
};
