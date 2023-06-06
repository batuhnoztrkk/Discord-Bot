const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require('wio.db');
exports.run = async (client, message, args) => {

    if(message.member.id === '278229385721675777' || message.member.id === '184365222734069760' || message.member.id === '568385647220490242'){
  let user = message.mentions.users.first() || client.users.cache.get(args.slice(1).join(' '))
  if(!args[0]) return message.channel.send("Örnek kullanım: .blacklist aç/kapat/bilgi id")
  switch(args[0]) {
    case "aç":
      if (!user) return message.channel.send("Bir kişiyi etiketlemelisin veya id sini yazmalısın.")
      if(user.id === '278229385721675777' || user.id === '184365222734069760' || user.id === '568385647220490242') return message.channel.send("Bu kullanıcı karalisteye alınamaz.")

      db.set(`karaliste_${user.id}`, true)
      message.channel.send(`\`${user.tag}\` **artık botu kullanamayacak.**`)
      break;
    case "kapat":
      if (!user) return message.channel.send("Bir kişiyi etiketlemelisin veya id sini yazmalısın.")
      if(user.id == id) return message.channel.send("Bu kullanıcı karalisteye alınamaz.")
      db.delete(`karaliste_${user.id}`)
      message.channel.send(`\`${user.tag}\` **artık botu kullanabilir.**`)
      break;
    case "bilgi":
      if (!user) return message.channel.send("Bir kişiyi etiketlemelisin veya id sini yazmalısın.")
  let i = db.fetch(`karaliste_${user.id}`)
        if(i == true) message.channel.send(`\`${user.tag}\` botu şu anda **kullanamıyor.**`)
        else message.channel.send(`\`${user.tag}\` botu şu anda **kullanabiliyor.**`)
      break;
}
 }
 else{
   return message.channel.send("Yetkin yok!").then(msg => msg.delete({ timeout: 500 }) && message.delete({ timeout: 500 }));
 }

}
 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ['blacklist'],
   permLevel: 4
 };
 exports.help = {
   name: 'blacklist',
   description: '',
   usage: 'blacklist'
 };
