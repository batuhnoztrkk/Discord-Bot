const Discord = require("discord.js");
exports.run = async (client, message, args) => {


let istek = args.slice(0).join(' ')
if(!istek) return message.channel.send('**Bug Bildirmek için Bir Bug Yazınız.** :x:')
const link = await message.channel.createInvite({maxAge:0})
const embed = new Discord.MessageEmbed()
.setTitle("Cavalrys Bug Sistemi")
.setColor('BLUE')
.setDescription(`**Bug Kanalı** ${message.channel.name} \n **Bug Bildirilen Sunucu** \`${message.guild.name}\` \n **Bugu Bildiren Kullanıcı** ${message.author.tag} \n **Bildirilen Bug :** \`${istek}\` \nSınırsız davet linki [Burada](https://discord.gg/${link.code})`)
.setFooter(`${client.user.username} Bug bilgi sistemi.`,message.guild.iconURL({dynamic:true}))
client.channels.cache.get('783281194548723742').send(embed)

message.channel.send("Bug bildiriminiz gönderildi. :white_check_mark:").then(message => message.delete({ timeout: 5000 }));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Bug-bildir','Bugbildir', 'bugbildir'],
  permLevel: 4
};

exports.help = {
  name: 'bug-bildir',
  description: 'İstek kodları belirtmeye yarar',
  usage: 'istek-kod <istek>'
}
