const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
const client = new(require("discord.js").Client)
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
exports.run = async (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }

  if(message.member.roles.cache.get('835083307434770432') || message.member.roles.cache.get('835620400288497705') || message.member.roles.cache.get('835620288955547732') || message.member.roles.cache.get('835083522170421269')
|| message.member.roles.cache.get('835083580278308884') || message.member.roles.cache.get('835623076942446622') || message.member.roles.cache.get('835622904967331911')
|| message.member.roles.cache.get('835622812780986408') || message.member.roles.cache.get('835621485082050590') || message.member.roles.cache.get('835621420703809577')
|| message.member.roles.cache.get('835619799441866822') || message.member.roles.cache.get('835621236867989535') || message.member.roles.cache.get('835621001642770462')
|| message.member.roles.cache.get('835620892033417259') || message.member.roles.cache.get('835268492844072970') || message.member.roles.cache.get('835621861265637436')
|| message.member.roles.cache.get('835619974025576490'))
  {


if(!message.member.voice.channel) {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Youtube izlemek için ses kanalında olman gerekli!`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

const embed = new MessageEmbed()
fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setDescription(`Tıklayarak aktif hale getirebilirsin. *[10 saniye sonra silinecektir]* \n >>>[${message.member.voice.channel.name} ses kanalı](https://discord.gg/${invite.code})`)
                    embed.setColor('RANDOM')
                    message.author.send(embed).then(msg => msg.delete({ timeout: 10000 }) && message.delete({ timeout: 4000 }));
                })
                //const embeds = new Discord.MessageEmbed()
                embed.setColor("BLUE")
                embed.setDescription(`DM kutunu kontrol etmeyi unutma. Sana mesaj olarak attım.`)
                message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

else {
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu Komutu Kullanmak İçin Yetkin Bulunmamakta! (<@&835083307434770432>)`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }));
}

 }
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['yt2gether'],
   permLevel: 0
 };
 exports.help = {
   name: 'yt2',
   description: '',
   usage: 'yt2'
 };
