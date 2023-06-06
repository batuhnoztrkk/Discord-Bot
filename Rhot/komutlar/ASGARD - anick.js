const Discord = require('discord.js');
const moment = require('moment');
const db = require('wio.db');
const ms = require('ms')
exports.run = async (client, message, args, reaction) => { //835083307434770432
  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

    var yetkili = await db.fetch("kayıtYetkili_" + message.guild.id);

    if(message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436') || message.member.roles.cache.get('835619974025576490'))
    {



   let member = message.mentions.users.first() || message.guild.members.cache.find(c => c.id === args[0]);
   if(!member)
   {
     const embed = new Discord.MessageEmbed()
     .setColor("RED")
     .setDescription(`İsim değiştirmek için: **.anick @kişi <nickname>**`)
     return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
   }


   let kisi = message.guild.member(member);
   let nick = args.slice(1).join(' ');
   kisi.setNickname(nick);

   const embed = new Discord.MessageEmbed()
   .setColor("BLUE")
   .setDescription(`${kisi}, yeni kullanıcı adı **${nick}** olarak güncellendi.`)
   message.channel.send({embed}).then(msg => msg.delete({ timeout: 5000 }) && message.delete({ timeout: 5000 }));

   const unban = new Discord.MessageEmbed()
   .setColor('BLACK')
   .setTitle("Admin İsim değişikliği")
   .setThumbnail(message.author.avatarURL())
   .setDescription(`**• İsim değişikliği yapan yetkili:** ${message.member} | ${message.member.id} \n**• İsmi değiştirilen kullanıcı:** ${member} | ${member.id} \n **Yeni isim:** ${nick}`)
   .setTimestamp()
   var data = await db.fetch("logKanal_" + message.guild.id)
   return message.client.channels.cache.get('835885873319903232').send(unban);
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
  aliases: ['adminnickname'],
  permLevel: 0
};
exports.help = {
  name: 'anick',
  description: '',
  usage: 'kayıt'
};
