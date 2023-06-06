const  Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const fs = require('fs');
const ayarlar = require('../ayarlar.json')
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
  fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
      var kSayı = `${files.length}`

  //var kSayı = `${files.length}`
  /*client.guilds.cache.reduce(a=>{
    rolSize+=a.roles.cache.size
  })*/
  const embed = new Discord.MessageEmbed()
     .setColor('#0AFF00')
     .addField('İsim',client.user.username,true)
     .addField('Sahibi:',client.users.cache.get(ayarlar.sahip).username,true)
     .addField('Yazılım dili:','Javascript & NodeJs',true)
     .addField('Kullanılan modül:','discord.js',true)
     .addField('NodeJS version:',process.versions.node,true)
     .addField('DiscordJS version:',['discord.js V12'],true)
     .addField('Platform:',process.platform,true)
     .addField('Ping:',Math.round(client.ws.ping),true)
     .addField('Toplam kullanıcı:',client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),true)
     .addField('Toplam Sunucu:',client.guilds.cache.size,true)
     .addField('Toplam kanal:',client.channels.cache.size,true)
     .addField('Toplam emoji:',client.emojis.cache.size,true)
     .addField('Bellek kullanımı:',`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,true)
     .addField('Komut sayısı:',kSayı,true)
     .setFooter(`${client.user.username} Bot bilgi sistemi.`,message.guild.iconURL({dynamic:true}))
     .setTimestamp()
     .setThumbnail(client.user.avatarURL({size:4096}))
     message.channel.send(embed)
     });
}
exports.conf = {
  enabled: true,
    guildOnly: true,
  aliases: ['istatistik', 'botbilgi', 'Botbilgi','bi'],
  permLevel: 4
};

exports.help = {
  name: 'botbilgi',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'istatistik [bot durumunu yazar]'
};
