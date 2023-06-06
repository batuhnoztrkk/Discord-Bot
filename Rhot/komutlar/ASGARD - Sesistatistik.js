const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
const { MessageEmbed } = require('discord.js')

const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {

  var kontrol = db.fetch("modKontrol_" + message.guild.id)
  if(kontrol === "Kapalı") {
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Bu komut yetkili tarafından kullanıma kapatılmıştır.`)
    return message.channel.send({embed}).then(msg => msg.delete({ timeout: 2000 }) && message.delete({ timeout: 2000 }));
  }//835268492844072970
  let myRole = message.guild.roles.cache.get("835268492844072970");
  if(message.member.roles.highest.position >= myRole.position){

  const { MessageEmbed } = require('discord.js');

      let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }));
      let tag = 'Δ';
      let enaltyt = message.guild.roles.cache.get('835623403330732073');
      let pubID = '838033904413835294';

      let topses = message.guild.members.cache.filter(s => s.voice.channel);

      let tagses = topses.filter(s => s.user.username.includes(tag));
      let ytses = topses.filter(s => s.roles.highest.position >= enaltyt.position);
      let bot = topses.filter(s => s.user.bot);
      let otherses = topses.size - ytses.size < 1 ? 0 : topses.size - ytses.size;
      let pubses = topses.filter(s => s.voice.channel.parentID === pubID);

      let yayın = topses.filter(s => s.voice.streaming);
      let mik = topses.filter(s => s.voice.selfMute).size;
      let kulak = topses.filter(s => s.voice.selfDeaf).size;
      let count = 1;
      let topCategory = message.guild.channels.cache.filter(s => s.type === 'category').sort((a, b) => Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === b.id).size - Number(message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.parentID === a.id).size))).map((c, index) => `${count++}. **#${c.name}**: **${c.members.filter(s => s.voice.channel && s.voice.channel.parentID === c.id).size}**`).splice(0, 3).join('\n');

      embed.setDescription(`
  Sesli kanallarda toplam **${topses.size}** kişi var !
  ────────────────────────────
  Ses kanallarında **${otherses || '0'}** normal kullanıcı var !
  Ses kanallarında **${tagses.size}** taglı kullanıcı var !
  Ses kanallarında **${ytses.size - 8}** yetkili var !
  ────────────────────────────
  Ses kanallarında **${yayın.size}** kişi yayın yapıyor !
  Mikrofonu kapalı: **${mik}**
  Kulaklığı kapalı: **${kulak}**
  Bot: **${bot.size}**
  ────────────────────────────
  Top 3 kategori sırası;
  ${topCategory || 'Boş'}
  `)
  message.channel.send({embed})
  }
  else{
  const embed = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamaktadır. [<@&835268492844072970>]`)
  return message.channel.send({embed}).then(msg => msg.delete({ timeout: 4000 }) && message.delete({ timeout: 4000 }));
}

 }
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['si'],
   permLevel: 0
 };
 exports.help = {
   name: 'sesistatistik',
   description: '',
   usage: 'kayıt'
 };
