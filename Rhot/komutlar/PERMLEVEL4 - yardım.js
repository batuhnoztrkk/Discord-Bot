const Discord = require("discord.js");
const ms = require("ms");
const db = require("wio.db");
const moment = require('moment')
const momentt = require("moment-duration-format")

const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  let muterol = db.fetch("muteRol_" + message.guild.id)
  let muteyetkili = db.fetch("muteYetkili_" + message.guild.id)
  let rolonaykanal = db.fetch("rolKanal_" + message.guild.id)
  let rolsskanal = db.fetch("rolSsKanal_" + message.guild.id)
  let banyetkili = db.fetch("banyetkili_" + message.guild.id)
  let logkanal = db.fetch("logKanal_" + message.guild.id)
  let kayıtyetkili = db.fetch("kayıtYetkili_" + message.guild.id)
  let kayıtrolü = db.fetch("kayıtRol_" + message.guild.id)

  if(!logkanal){
    if(message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("Merhaba sunucuda yetkili olarak gözüküyorsun. Komutları göstermeden önce log kanalını ayarlaman gerek. **.log-kanal <kanal id>**");}}
  //if(!banyetkili) return message.channel.send("Komutları göstermeden önce ban yetkilisini ayarlaman gerek. **.ban-yetkili <rol id>**");
  //if(!muterol || !muteyetkili) return message.channel.send("Komutları göstermeden önce **mute rolü** ve ** mute yetkilisini** ayarlaman gerek. **.mute-ayarla <Yetkili Rolün idsi> <Muteli rolün idsi>**");
  //if(!kayıtyetkili || !kayıtrolü) return message.channel.send("Komutları göstermeden önce Kayıt yetkilisini ve kayıt rolünü ayarlaman gerek. **.kayıt-ayarla**");

var kontrol1 = db.fetch("modKontrol_" + message.guild.id)
var kontrol2 = db.fetch("logoKontrol_" + message.guild.id)
var kontrol3 = db.fetch("kullanıcıKontrol_" + message.guild.id)
var kontrol4 = db.fetch("eğlenceKontrol_" + message.guild.id)
var kontrol5 = db.fetch("ekonomiKontrol_" + message.guild.id)
var yaz1 = "Aktif"
var yaz2 = "Aktif"
var yaz3 = "Aktif"
var yaz4 = "Aktif"
var yaz5 = "Aktif"
if(kontrol1 === "Kapalı") {yaz1 = "Pasif"}
if(kontrol2 === "Kapalı") {yaz2 = "Pasif"}
if(kontrol3 === "Kapalı") {yaz3 = "Pasif"}
if(kontrol4 === "Kapalı") {yaz4 = "Pasif"}
if(kontrol5 === "Kapalı") {yaz5 = "Pasif"}

if(message.member.hasPermission("ADMINISTRATOR")) {
  const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("KOMUTLAR")
      .setDescription(`
        **💨 Y-kullanıcı :** Kullanıcı komutlarını listeler. \`${yaz3}\`
        **💨 Y-moderatör :** Moderatör komutlarını listeler. \`${yaz1}\`
        **💨 Y-bot :** Bot komutlarını listeler. \`Aktif\`
        **💨 Y-eğlence :** Eğlence komutlarını listeler. \`${yaz4}\`
        **💨 Y-logo :** Logo komutlarını listeler. \`${yaz2}\`
        **💨 Y-ekonomi :** Ekonomi komutlarını listeler. \`${yaz5}\`

        \`İstemediğiniz komutları açıp kapatabilirsiniz.\`
        \`(.logo aç/kapat) (.moderatör aç/kapat) (.kullanıcı aç/kapat) (.eğlence aç/kapat) (.ekonomi aç/kapat)\`
        `)
      .setTimestamp()
      .setFooter(`${client.user.username} Yardım sistemi.`,message.guild.iconURL({dynamic:true}))
      return message.channel.send({embed});
}

  const embed = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setTitle("KOMUTLAR")
      .setDescription(`
        **💨 Y-kullanıcı :** Kullanıcı komutlarını listeler. \`${yaz3}\`
        **💨 Y-moderatör :** Moderatör komutlarını listeler. \`${yaz1}\`
        **💨 Y-bot :** Bot komutlarını listeler. \`Aktif\`
        **💨 Y-eğlence :** Eğlence komutlarını listeler. \`${yaz4}\`
        **💨 Y-logo :** Logo komutlarını listeler. \`${yaz2}\`
        **💨 Y-ekonomi :** Ekonomi komutlarını listeler. \`${yaz5}\`
        `)
      .setTimestamp()
      .setFooter(`${client.user.username} Yardım sistemi.`,message.guild.iconURL({dynamic:true}))
      return message.channel.send({embed});


  }

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['help' , 'yardim'],
    permLevel: 4
  };

  exports.help = {
    name: 'yardım',
    description: '',
    usage: 'yardım'
  };
